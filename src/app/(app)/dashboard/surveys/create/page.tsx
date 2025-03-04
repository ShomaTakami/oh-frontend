"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard-layout';
import { DragDropContext, Droppable, Draggable } from '@/components/survey-builder/drag-drop';
import { QuestionBuilder } from '@/components/survey-builder/question-builder';
import { SurveyPreview } from '@/components/survey-builder/survey-preview';
import { Save, Eye, Settings, Trash2, Plus, GripVertical } from 'lucide-react';

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

export default function CreateSurveyPage() {
  const [activeTab, setActiveTab] = useState('design');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type,
      title: `新しい${getQuestionTypeName(type)}質問`,
      required: false,
      options: type === 'radio' || type === 'checkbox' || type === 'dropdown' ? ['選択肢1', '選択肢2', '選択肢3'] : undefined,
      min: type === 'slider' ? 0 : undefined,
      max: type === 'slider' ? 100 : undefined,
      step: type === 'slider' ? 1 : undefined,
      rows: type === 'matrix' ? ['行1', '行2', '行3'] : undefined,
      columns: type === 'matrix' ? ['列1', '列2', '列3'] : undefined,
    };
    setQuestions([...questions, newQuestion]);
  };

  const getQuestionTypeName = (type: QuestionType): string => {
    switch (type) {
      case 'text': return 'テキスト入力';
      case 'radio': return '単一選択';
      case 'checkbox': return '複数選択';
      case 'dropdown': return 'ドロップダウン';
      case 'slider': return 'スライダー';
      case 'matrix': return 'マトリックス';
      default: return type;
    }
  };

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updatedQuestion } : q));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setQuestions(items);
  };

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "タイトルがありません",
        description: "アンケートのタイトルを入力してください。",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        variant: "destructive",
        title: "質問がありません",
        description: "少なくとも1つの質問を追加してください。",
      });
      return;
    }

    try {
      // In a real app, this would be an API call to your Laravel backend
      // const response = await fetch('https://your-laravel-api.com/api/surveys', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
      //   },
      //   body: JSON.stringify({ 
      //     title, 
      //     description, 
      //     questions,
      //     is_public: isPublic,
      //     requires_password: requiresPassword,
      //     password: requiresPassword ? password : null
      //   }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just simulate a successful save
      // if (!response.ok) throw new Error('Failed to save survey');
      
      toast({
        title: "アンケートを保存しました",
        description: "アンケートが正常に保存されました。",
      });
      
      router.push('/dashboard/surveys');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "保存に失敗しました",
        description: "アンケートの保存中に問題が発生しました。",
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'design':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">アンケートタイトル</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="アンケートタイトルを入力"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">説明（任意）</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="アンケートの説明を入力"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">質問</h3>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {questions.map((question, index) => (
                        <Draggable key={question.id} draggableId={question.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border rounded-md p-4 bg-card"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <h4 className="font-medium">質問 {index + 1}</h4>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeQuestion(question.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                              <QuestionBuilder 
                                question={question} 
                                onChange={(updatedQuestion) => updateQuestion(question.id, updatedQuestion)} 
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {questions.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-md">
                  <p className="text-muted-foreground mb-4">まだ質問が追加されていません</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    右側のパネルを使用して質問を追加してください
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      case 'preview':
        return (
          <SurveyPreview 
            title={title} 
            description={description} 
            questions={questions} 
          />
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-survey">公開アンケート</Label>
                  <p className="text-sm text-muted-foreground">
                    リンクを持つ誰でもアクセスできるようにする
                  </p>
                </div>
                <Switch 
                  id="public-survey" 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-protection">パスワード保護</Label>
                  <p className="text-sm text-muted-foreground">
                    アンケートへのアクセスにパスワードを要求する
                  </p>
                </div>
                <Switch 
                  id="password-protection" 
                  checked={requiresPassword} 
                  onCheckedChange={setRequiresPassword} 
                />
              </div>
              
              {requiresPassword && (
                <div className="pt-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="パスワードを入力"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">通知</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">メール通知</Label>
                  <p className="text-sm text-muted-foreground">
                    誰かがアンケートに回答した時にメールを受け取る
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">高度な設定</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhook-url">Webhook URL（任意）</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://example.com/webhook"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    アンケート回答をこのURLに送信します
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">アンケート作成</h1>
            <p className="text-muted-foreground">
              アンケートをデザインし、設定をカスタマイズする
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => router.push('/dashboard/surveys')}>
              キャンセル
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              アンケートを保存
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="design">
                      <div className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        デザイン
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <div className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        プレビュー
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <div className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        設定
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {renderTabContent()}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>質問を追加</CardTitle>
                <CardDescription>
                  アンケートに追加する質問タイプを選択
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => addQuestion('text')}
                >
                  テキスト入力
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => addQuestion('radio')}
                >
                  単一選択（ラジオボタン）
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => addQuestion('checkbox')}
                >
                  複数選択（チェックボックス）
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => addQuestion('dropdown')}
                >
                  ドロップダウン
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => addQuestion('slider')}
                >
                  スライダー
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => addQuestion('matrix')}
                >
                  マトリックス
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">ヒント</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>ドラッグ＆ドロップで質問を並べ替え</li>
                  <li>保存前にアンケートをプレビュー</li>
                  <li>質問は明確で簡潔に</li>
                  <li>様々な質問タイプを使用する</li>
                </ul>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}