"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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

interface SurveyPreviewProps {
  title: string;
  description?: string;
  questions: Question[];
}

export function SurveyPreview({ title, description, questions }: SurveyPreviewProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const handleTextChange = (questionId: string, value: string) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = responses[questionId] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, option];
    } else {
      newValues = currentValues.filter((value: string) => value !== option);
    }
    
    setResponses({ ...responses, [questionId]: newValues });
  };

  const handleDropdownChange = (questionId: string, value: string) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleSliderChange = (questionId: string, value: number[]) => {
    setResponses({ ...responses, [questionId]: value[0] });
  };

  const handleMatrixChange = (questionId: string, row: string, column: string) => {
    const matrixResponses = responses[questionId] || {};
    setResponses({ 
      ...responses, 
      [questionId]: { 
        ...matrixResponses, 
        [row]: column 
      } 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('アンケート回答:', responses);
    // In a real app, you would send this data to your backend
  };

  if (!title && questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">
          タイトルと質問を追加してアンケートをプレビューしてください
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{title || '無題のアンケート'}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-2">
                <div>
                  <Label className="text-base font-medium">
                    {index + 1}. {question.title}
                    {question.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {question.description && (
                    <p className="text-sm text-muted-foreground mt-1">{question.description}</p>
                  )}
                </div>

                <div className="mt-2">
                  {question.type === 'text' && (
                    <Textarea
                      placeholder="回答を入力"
                      value={responses[question.id] || ''}
                      onChange={(e) => handleTextChange(question.id, e.target.value)}
                      required={question.required}
                    />
                  )}

                  {question.type === 'radio' && question.options && (
                    <RadioGroup
                      value={responses[question.id] || ''}
                      onValueChange={(value) => handleRadioChange(question.id, value)}
                      required={question.required}
                    >
                      <div className="space-y-2">
                        {question.options.map((option, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-option-${i}`} />
                            <Label htmlFor={`${question.id}-option-${i}`} className="font-normal">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {question.type === 'checkbox' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${question.id}-option-${i}`}
                            checked={(responses[question.id] || []).includes(option)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(question.id, option, checked as boolean)
                            }
                          />
                          <Label htmlFor={`${question.id}-option-${i}`} className="font-normal">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'dropdown' && question.options && (
                    <Select
                      value={responses[question.id] || ''}
                      onValueChange={(value) => handleDropdownChange(question.id, value)}
                      required={question.required}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {question.options.map((option, i) => (
                          <SelectItem key={i} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {question.type === 'slider' && (
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[question.min || 0]}
                        max={question.max || 100}
                        min={question.min || 0}
                        step={question.step || 1}
                        onValueChange={(value) => handleSliderChange(question.id, value)}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{question.min || 0}</span>
                        <span>{question.max || 100}</span>
                      </div>
                      <div className="text-center">
                        選択された値: {responses[question.id] || question.min || 0}
                      </div>
                    </div>
                  )}

                  {question.type === 'matrix' && question.rows && question.columns && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2"></th>
                            {question.columns.map((column, i) => (
                              <th key={i} className="p-2 text-center font-medium">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {question.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-t">
                              <td className="p-2 font-medium">{row}</td>
                              {question.columns?.map((column, colIndex) => (
                                <td key={colIndex} className="p-2 text-center">
                                  <RadioGroup
                                    value={(responses[question.id] || {})[row] === column ? column : ''}
                                    onValueChange={() => handleMatrixChange(question.id, row, column)}
                                    className="flex justify-center"
                                  >
                                    <RadioGroupItem 
                                      value={column} 
                                      id={`${question.id}-${row}-${column}`} 
                                    />
                                  </RadioGroup>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit">送信</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}