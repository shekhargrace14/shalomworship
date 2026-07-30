'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Copy, User, Building2, ListMusic, Music4, Database, PaintBucket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { ScrollArea } from "@/components/ui/scroll-area";

// import { useUserStore } from "@/store/useUserStore";
import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ScrollArea } from '../ui/scroll-area';
import { useBackgroundColorStore } from '@/store/useBackgroundColorStore';

export default function DevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  const [open, setOpen] = useState(true);
  const [showJson, setShowJson] = useState(false);

  const user = useAuthStore((s) => s.user);

  const channels = useChannelStore((s) => s.channels);
  const currentChannel = useChannelStore((s) => s.currentChannel);

  const setlists = useSetlistStore((s) => s.channelAllSetlists);
  const currentSetlist = useSetlistStore((s) => s.currentSetlist);

  const backgroundColor = useBackgroundColorStore((s) => s.backgroundColor);

  const json = JSON.stringify(
    {
      user,
      channels,
      currentChannel,
      setlists,
      currentSetlist,
    },
    null,
    2,
  );

  const copy = async () => {
    await navigator.clipboard.writeText(json);
  };

  return (
    <Card className="fixed bottom-4 right-4 z-[99999] w-[420px] shadow-2xl p-0 overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between border-b bg-muted px-4 py-3">
        <div className="flex items-center gap-2 font-semibold">
          <Database className="h-4 w-4" />
          Dev Tools
        </div>

        <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {open && (
        <ScrollArea className="max-h-[80vh]">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="channel">Channel</TabsTrigger>
              <TabsTrigger value="setlist">Setlist</TabsTrigger>
              <TabsTrigger value="color" style={{ backgroundColor }}>
                Color
              </TabsTrigger>
            </TabsList>

            {/* USER */}

            <TabsContent value="user" className="space-y-4 p-4">
              <Section title="Current User" icon={<User className="h-4 w-4" />}>
                {user ? (
                  <>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-muted-foreground text-xs">{user.email}</div>

                    <Badge className="mt-2">{user.role}</Badge>
                    <JsonViewer title="User" data={user} />
                  </>
                ) : (
                  <Badge variant="destructive">Not Logged In</Badge>
                )}
              </Section>
            </TabsContent>

            {/* CHANNEL */}

            <TabsContent value="channel" className="space-y-4 p-4">
              <Section title={`Channels (${channels.length})`} icon={<Building2 className="h-4 w-4" />}>
                <Badge className="mb-3">Current: {currentChannel?.title ?? 'None'}</Badge>

                <div className="space-y-2">
                  {channels.map((channel) => (
                    <div key={channel.id} className={`rounded-md border p-2 ${currentChannel?.id === channel.id ? 'border-primary bg-primary/10' : ''}`}>
                      {channel.title}
                    </div>
                  ))}
                  <JsonViewer
                    title="Channels"
                    data={{
                      channels,
                      currentChannel,
                    }}
                  />
                </div>
              </Section>
            </TabsContent>

            {/* SETLIST */}

            <TabsContent value="setlist" className="space-y-4 p-4">
              <Section title={`Setlists (${setlists.length})`} icon={<ListMusic className="h-4 w-4" />}>
                <Badge className="mb-3">Current: {currentSetlist?.title ?? 'None'}</Badge>

                <div className="space-y-2 max-h-80 overflow-auto">
                  {setlists.map((setlist) => (
                    <div
                      key={setlist.id}
                      className={`rounded-md border p-2 
                      ${currentSetlist?.id === setlist.id ? 'border-primary bg-primary/10' : ''}
                    `}
                    >
                      {setlist.title}
                    </div>
                  ))}
                  <JsonViewer
                    title="Setlists"
                    data={{
                      setlists,
                      currentSetlist,
                    }}
                  />
                </div>
              </Section>
            </TabsContent>

            {/* COLOR */}

            <TabsContent value="color" className="space-y-4 p-4" style={{ backgroundColor }}>
              <Section title={`Color `} icon={<PaintBucket className="h-4 w-4" />}>
                <Badge className={` text-black`}>Current: {backgroundColor ?? 'None'}</Badge>
              </Section>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      )}
    </Card>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        {icon}

        {title}
      </div>

      {children}
    </div>
  );
}

function JsonViewer({ title, data }: { title: string; data: unknown }) {
  const [open, setOpen] = useState(false);

  const json = JSON.stringify(data, null, 2);

  return (
    <div className="mt-4 rounded-lg border">
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
        <Button variant="ghost" size="sm" onClick={() => setOpen(!open)} className="h-auto p-0">
          {open ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
          {title} JSON
        </Button>

        <Button size="icon" variant="ghost" onClick={() => navigator.clipboard.writeText(json)}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      {open && (
        <div className="max-h-64 overflow-auto">
          <pre className="min-w-max p-3 font-mono text-xs">{json}</pre>
        </div>
      )}
    </div>
  );
}
