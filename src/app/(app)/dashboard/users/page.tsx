"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard-layout';
import Link from 'next/link';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, UserPlus } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UsersPage() {
  // Mock data for users
  const users = [
    { 
      id: 1, 
      name: '山田 太郎', 
      email: 'taro.yamada@example.com', 
      role: 'admin', 
      status: 'active',
      created: '2025-01-15',
      surveys: 12
    },
    { 
      id: 2, 
      name: '佐藤 花子', 
      email: 'hanako.sato@example.com', 
      role: 'user', 
      status: 'active',
      created: '2025-02-20',
      surveys: 8
    },
    { 
      id: 3, 
      name: '鈴木 一郎', 
      email: 'ichiro.suzuki@example.com', 
      role: 'user', 
      status: 'inactive',
      created: '2025-03-10',
      surveys: 3
    },
    { 
      id: 4, 
      name: '田中 美咲', 
      email: 'misaki.tanaka@example.com', 
      role: 'user', 
      status: 'active',
      created: '2025-03-25',
      surveys: 5
    },
    { 
      id: 5, 
      name: '伊藤 健太', 
      email: 'kenta.ito@example.com', 
      role: 'admin', 
      status: 'active',
      created: '2025-04-05',
      surveys: 15
    },
    { 
      id: 6, 
      name: '渡辺 さくら', 
      email: 'sakura.watanabe@example.com', 
      role: 'user', 
      status: 'active',
      created: '2025-04-18',
      surveys: 7
    },
    { 
      id: 7, 
      name: '高橋 大輔', 
      email: 'daisuke.takahashi@example.com', 
      role: 'user', 
      status: 'inactive',
      created: '2025-05-02',
      surveys: 0
    },
    { 
      id: 8, 
      name: '小林 優子', 
      email: 'yuko.kobayashi@example.com', 
      role: 'user', 
      status: 'active',
      created: '2025-05-20',
      surveys: 2
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'user':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'アクティブ';
      case 'inactive':
        return '非アクティブ';
      default:
        return status;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return '管理者';
      case 'user':
        return 'ユーザー';
      default:
        return role;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ユーザー管理</h1>
            <p className="text-muted-foreground">
              システムユーザーの管理と権限設定
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <UserPlus className="mr-2 h-4 w-4" />
            ユーザー追加
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="ユーザーを検索..."
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
                      ロール
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>すべて</DropdownMenuItem>
                    <DropdownMenuItem>管理者</DropdownMenuItem>
                    <DropdownMenuItem>ユーザー</DropdownMenuItem>
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
                    <th className="text-left py-3 px-4 font-medium">ユーザー</th>
                    <th className="text-left py-3 px-4 font-medium">ロール</th>
                    <th className="text-left py-3 px-4 font-medium">ステータス</th>
                    <th className="text-left py-3 px-4 font-medium">アンケート数</th>
                    <th className="text-left py-3 px-4 font-medium">登録日</th>
                    <th className="text-right py-3 px-4 font-medium">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getRoleColor(user.role)}>
                          {getRoleText(user.role)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.surveys}</td>
                      <td className="py-3 px-4">{user.created}</td>
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
                              <Edit className="mr-2 h-4 w-4" />
                              <span>編集</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/dashboard/users/${user.id}/surveys`} className="flex w-full items-center">
                                <span>アンケート表示</span>
                              </Link>
                            </DropdownMenuItem>
                            {user.status === 'active' ? (
                              <DropdownMenuItem>
                                <span>無効化</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <span>有効化</span>
                              </DropdownMenuItem>
                            )}
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