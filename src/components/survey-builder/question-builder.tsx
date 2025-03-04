"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2 } from 'lucide-react';

// Define question types
type QuestionType = 'text' | 'radio' | 'checkbox' | 'dropdown' | 'slider' | 'matrix';

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  rows?: string[];
  columns?: string[];
}

interface QuestionBuilderProps {
  question: Question;
  onChange: (updatedQuestion: Partial<Question>) => void;
}

export function QuestionBuilder({ question, onChange }: QuestionBuilderProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ description: e.target.value });
  };

  const handleRequiredChange = (checked: boolean) => {
    onChange({ required: checked });
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!question.options) return;
    const newOptions = [...question.options];
    newOptions[index] = value;
    onChange({ options: newOptions });
  };

  const addOption = () => {
    if (!question.options) return;
    onChange({ options: [...question.options, `選択肢${question.options.length + 1}`] });
  };

  const removeOption = (index: number) => {
    if (!question.options) return;
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    onChange({ options: newOptions });
  };

  const handleRowChange = (index: number, value: string) => {
    if (!question.rows) return;
    const newRows = [...question.rows];
    newRows[index] = value;
    onChange({ rows: newRows });
  };

  const addRow = () => {
    if (!question.rows) return;
    onChange({ rows: [...question.rows, `行${question.rows.length + 1}`] });
  };

  const removeRow = (index: number) => {
    if (!question.rows) return;
    const newRows = [...question.rows];
    newRows.splice(index, 1);
    onChange({ rows: newRows });
  };

  const handleColumnChange = (index: number, value: string) => {
    if (!question.columns) return;
    const newColumns = [...question.columns];
    newColumns[index] = value;
    onChange({ columns: newColumns });
  };

  const addColumn = () => {
    if (!question.columns) return;
    onChange({ columns: [...question.columns, `列${question.columns.length + 1}`] });
  };

  const removeColumn = (index: number) => {
    if (!question.columns) return;
    const newColumns = [...question.columns];
    newColumns.splice(index, 1);
    onChange({ columns: newColumns });
  };

  const handleSliderChange = (field: 'min' | 'max' | 'step', value: number) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`question-${question.id}-title`}>質問</Label>
        <Input
          id={`question-${question.id}-title`}
          value={question.title}
          onChange={handleTitleChange}
          placeholder="質問を入力"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`question-${question.id}-description`}>説明（任意）</Label>
        <Textarea
          id={`question-${question.id}-description`}
          value={question.description || ''}
          onChange={handleDescriptionChange}
          placeholder="説明を入力"
          className="mt-1"
          rows={2}
        />
      </div>

      {(question.type === 'radio' || question.type === 'checkbox' || question.type === 'dropdown') && (
        <div>
          <Label>選択肢</Label>
          <div className="space-y-2 mt-1">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`選択肢${index + 1}`}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                  disabled={question.options?.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addOption}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              選択肢を追加
            </Button>
          </div>
        </div>
      )}

      {question.type === 'slider' && (
        <div className="space-y-4">
          <div>
            <Label>範囲</Label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <Label htmlFor={`question-${question.id}-min`} className="text-sm">最小値</Label>
                <Input
                  id={`question-${question.id}-min`}
                  type="number"
                  value={question.min}
                  onChange={(e) => handleSliderChange('min', Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`question-${question.id}-max`} className="text-sm">最大値</Label>
                <Input
                  id={`question-${question.id}-max`}
                  type="number"
                  value={question.max}
                  onChange={(e) => handleSliderChange('max', Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor={`question-${question.id}-step`}>ステップ</Label>
            <Input
              id={`question-${question.id}-step`}
              type="number"
              value={question.step}
              onChange={(e) => handleSliderChange('step', Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>プレビュー</Label>
            <div className="px-2 py-6">
              <Slider
                defaultValue={[50]}
                max={question.max}
                min={question.min}
                step={question.step}
              />
            </div>
          </div>
        </div>
      )}

      {question.type === 'matrix' && (
        <div className="space-y-4">
          <div>
            <Label>行</Label>
            <div className="space-y-2 mt-1">
              {question.rows?.map((row, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={row}
                    onChange={(e) => handleRowChange(index, e.target.value)}
                    placeholder={`行${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(index)}
                    disabled={question.rows?.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addRow}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                行を追加
              </Button>
            </div>
          </div>

          <div>
            <Label>列</Label>
            <div className="space-y-2 mt-1">
              {question.columns?.map((column, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={column}
                    onChange={(e) => handleColumnChange(index, e.target.value)}
                    placeholder={`列${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColumn(index)}
                    disabled={question.columns?.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addColumn}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                列を追加
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id={`question-${question.id}-required`}
          checked={question.required}
          onCheckedChange={handleRequiredChange}
        />
        <Label htmlFor={`question-${question.id}-required`}>必須</Label>
      </div>
    </div>
  );
}