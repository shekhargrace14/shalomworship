import React from 'react';
import ItemList from './item/item-list';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  section: any;
  updateSectionField: any;
  addItem: any;
  updateItemField: any;
  removeItem: any;
};

const SectionCard = ({ section, updateSectionField, addItem, updateItemField, removeItem }: Props) => {
  return (
    <div className="pl-4">
      <ItemList section={section} addItem={addItem} updateItemField={updateItemField} removeItem={removeItem} />
    </div>
  );
};

export default SectionCard;
