import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ClipboardList, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 px-4 md:px-6 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-6 w-6" />
          <h1 className="text-2xl font-bold">OneHub</h1>
        </div>
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームに戻る
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">OneHub デモ</h1>
            <p className="text-muted-foreground">
              このインタラクティブデモでアンケートプラットフォームを体験してください
            </p>
          </div>

          <Tabs defaultValue="survey" className="mb-10">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="survey">アンケートに回答</TabsTrigger>
              <TabsTrigger value="builder">アンケート作成</TabsTrigger>
            </TabsList>
            <TabsContent value="survey" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>製品フィードバックアンケート</CardTitle>
                  <CardDescription>
                    あなたの意見を大切にしています！製品についてのご意見をお聞かせください。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Question 1 */}
                  <div className="space-y-3">
                    <h3 className="font-medium">1. 当社の製品にどの程度満足していますか？</h3>
                    <RadioGroup defaultValue="satisfied">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-satisfied" id="q1-very-satisfied" />
                        <Label htmlFor="q1-very-satisfied">非常に満足</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="satisfied" id="q1-satisfied" />
                        <Label htmlFor="q1-satisfied">満足</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="q1-neutral" />
                        <Label htmlFor="q1-neutral">どちらでもない</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dissatisfied" id="q1-dissatisfied" />
                        <Label htmlFor="q1-dissatisfied">不満</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-dissatisfied" id="q1-very-dissatisfied" />
                        <Label htmlFor="q1-very-dissatisfied">非常に不満</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Question 2 */}
                  <div className="space-y-3">
                    <h3 className="font-medium">2. 最もよく使用する機能はどれですか？（複数選択可）</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="q2-feature1" />
                        <Label htmlFor="q2-feature1">アンケート作成</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="q2-feature2" defaultChecked />
                        <Label htmlFor="q2-feature2">分析ダッシュボード</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="q2-feature3" />
                        <Label htmlFor="q2-feature3">ユーザー管理</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="q2-feature4" defaultChecked />
                        <Label htmlFor="q2-feature4">データエクスポート</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="q2-feature5" />
                        <Label htmlFor="q2-feature5">API連携</Label>
                      </div>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="space-y-3">
                    <h3 className="font-medium">3. 他の人に当社の製品をどの程度推薦したいですか？</h3>
                    <div className="space-y-4">
                      <Slider defaultValue={[8]} max={10} min={0} step={1} />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0 - 全く推薦しない</span>
                        <span>10 - 強く推薦する</span>
                      </div>
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="space-y-3">
                    <h3 className="font-medium">4. どのような改善を希望しますか？</h3>
                    <Textarea placeholder="ご提案をお聞かせください..." />
                  </div>

                  <Button className="mt-4">フィードバックを送信</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="builder" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>アンケート作成デモ</CardTitle>
                  <CardDescription>
                    直感的なビルダーで簡単にカスタムアンケートを作成できます
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="survey-title">アンケートタイトル</Label>
                      <input
                        id="survey-title"
                        className="w-full p-2 border rounded-md"
                        defaultValue="顧客満足度調査"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="survey-description">説明</Label>
                      <Textarea
                        id="survey-description"
                        defaultValue="製品やサービスの改善のため、ご意見をお聞かせください。"
                      />
                    </div>

                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">質問 1</h3>
                        <Select defaultValue="radio">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="質問タイプ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">テキスト入力</SelectItem>
                            <SelectItem value="radio">単一選択</SelectItem>
                            <SelectItem value="checkbox">複数選択</SelectItem>
                            <SelectItem value="dropdown">ドロップダウン</SelectItem>
                            <SelectItem value="slider">スライダー</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="q1-title">質問文</Label>
                        <input
                          id="q1-title"
                          className="w-full p-2 border rounded-md"
                          defaultValue="当社のカスタマーサービスにどの程度満足していますか？"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>選択肢</Label>
                        <div className="space-y-2">
                          <input className="w-full p-2 border rounded-md" defaultValue="非常に満足" />
                          <input className="w-full p-2 border rounded-md" defaultValue="満足" />
                          <input className="w-full p-2 border rounded-md" defaultValue="どちらでもない" />
                          <input className="w-full p-2 border rounded-md" defaultValue="不満" />
                          <input className="w-full p-2 border rounded-md" defaultValue="非常に不満" />
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          + 選択肢を追加
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      + 質問を追加
                    </Button>

                    <div className="flex justify-end space-x-2 mt-6">
                      <Button variant="outline">プレビュー</Button>
                      <Button>アンケートを保存</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <p className="mb-6 text-muted-foreground">
              独自のアンケートを作成する準備はできましたか？
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">はじめる</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">ログイン</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/40 mt-24">
        <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 OneHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}