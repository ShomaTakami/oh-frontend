"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard-layout';
import Link from 'next/link';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default function SurveysPage() {
  // Mock data for surveys
  const surveys = [
    { 
      id: 1, 
      title: '顧客満足度調査', 
      status: 'active', 
      responses: 145, 
      created: '2025-06-01',
      lastUpdated: '2025-06-05'
    },
    { 
      id: 2, 
      title: '製品フィードバック', 
      status: 'active', 
      responses: 87, 
      created: '2025-05-28',
      lastUpdated: '2025-06-02'
    },
    { 
      id: 3, 
      title: '従業員エンゲージメント', 
      status: 'draft', 
      responses: 0, 
      created: '2025-05-25',
      lastUpdated: '2025-05-25'
    },
    { 
      id: 4, 
      title: '市場調査', 
      status: 'active', 
      responses: 32, 
      created: '2025-05-20',
      lastUpdated: '2025-05-22'
    },
    { 
      id: 5, 
      title: 'ウェブサイト使いやすさテスト', 
      status: 'closed', 
      responses: 78, 
      created: '2025-05-15',
      lastUpdated: '2025-05-30'
    },
    { 
      id: 6, 
      title: '会議フィードバック', 
      status: 'active', 
      responses: 56, 
      created: '2025-05-10',
      lastUpdated: '2025-05-12'
    },
    { 
      id: 7, 
      title: 'トレーニング評価', 
      status: 'draft', 
      responses: 0, 
      created: '2025-05-05',
      lastUpdated: '2025-05-05'
    },
    { 
      id: 8, 
      title: '顧客ニーズ評価', 
      status: 'closed', 
      responses: 124, 
      created: '2025-04-28',
      lastUpdated: '2025-05-15'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '公開中';
      case 'draft':
        return '下書き';
      case 'closed':
        return '終了';
      default:
        return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">アンケート</h1>
            <p className="text-muted-foreground">
              アンケートの管理と回答の確認
            </p>
          </div>
          <Link href="/dashboard/surveys/create">
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              アンケート作成
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="アンケートを検索..."
                  className="w-full pl-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  フィルター
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      ステータス
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>すべて</DropdownMenuItem>
                    <DropdownMenuItem>公開中</DropdownMenuItem>
                    <DropdownMenuItem>下書き</DropdownMenuItem>
                    <DropdownMenuItem>終了</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">タイトル</th>
                    <th className="text-left py-3 px-4 font-medium">ステータス</th>
                    <th className="text-left py-3 px-4 font-medium">回答数</th>
                    <th className="text-left py-3 px-4 font-medium">作成日</th>
                    <th className="text-left py-3 px-4 font-medium">最終更新日</th>
                    <th className="text-right py-3 px-4 font-medium">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr key={survey.id} className="border-b">
                      <td className="py-3 px-4">
                        <Link href={`/dashboard/surveys/${survey.id}`} className="hover:underline">
                          {survey.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getStatusColor(survey.status)}>
                          {getStatusText(survey.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{survey.responses}</td>
                      <td className="py-3 px-4">{survey.created}</td>
                      <td className="py-3 px-4">{survey.lastUpdated}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>アクション</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={`/dashboard/surveys/${survey.id}`} className="flex w-full items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>表示</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/dashboard/surveys/${survey.id}/edit`} className="flex w-full items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>編集</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/dashboard/surveys/${survey.id}/duplicate`} className="flex w-full items-center">
                                <Copy className="mr-2 h-4 w-4" />
                                <span>複製</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>削除</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                <strong>1</strong> から <strong>8</strong> を表示（全 <strong>8</strong> 件）
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  前へ
                </Button>
                <Button variant="outline" size="sm" disabled>
                  次へ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}