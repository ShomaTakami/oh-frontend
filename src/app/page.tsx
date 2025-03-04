// import { Button } from '@/components/ui/button';
import Button from '@/components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ClipboardList, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function Home() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  if (!token) {
    redirect('/login'); // 未ログインなら /login にリダイレクト
  } else {
    redirect('/dashboard'); // ログイン済みなら /dashboard にリダイレクト
  }

  return null; // 画面は表示しない
}
