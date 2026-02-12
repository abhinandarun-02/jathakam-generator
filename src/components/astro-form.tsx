'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AstroData } from '@/lib/types';
import {
  User, Calendar, Clock, MapPin, VenetianMask, Star, Home, Mail, Hash, BookOpen, Sunrise, Flame, BrainCircuit, Leaf, Atom, Sun, Gem, Telescope, Moon, Shield
} from 'lucide-react';

interface AstroFormProps {
  data: AstroData;
  setData: React.Dispatch<React.SetStateAction<AstroData>>;
}

const MALAYALAM_MONTHS = ['ചിങ്ങം', 'കന്നി', 'തുലാം', 'വൃശ്ചികം', 'ധനു', 'മകരം', 'കുംഭം', 'മീനം', 'മേടം', 'ഇടവം', 'മിഥുനം', 'കർക്കടകം'];
const RASHI_OPTIONS = ['മേടം', 'ഇടവം', 'മിഥുനം', 'കർക്കടകം', 'ചിങ്ങം', 'കന്നി', 'തുലാം', 'വൃശ്ചികം', 'ധനു', 'മകരം', 'കുംഭം', 'മീനം'];
const GRAHANGAL_OPTIONS = ['സൂര്യൻ', 'ചന്ദ്രൻ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'ശുക്രൻ', 'ശനി', 'രാഹു', 'കേതു'];
const CHANDRARISHTI_OPTIONS = ['ഉണ്ട്', 'ഇല്ല'];
const THAMBOOLAM_OPTIONS = ['വെറ്റില', 'അടയ്ക്ക', 'പഴം', 'പണം'];

export default function AstroForm({ data, setData }: AstroFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: 'male' | 'female' | 'other') => {
    setData((prev) => ({ ...prev, gender: value }));
  };

  const handleSelectChange = (name: keyof AstroData) => (value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User />
          വിശദാംശങ്ങൾ നൽകുക
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2"><User className="h-4 w-4" /> പേര് (Name)</Label>
            <Input id="name" name="name" value={data.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2"><Hash className="h-4 w-4" /> പ്രായം (Age)</Label>
            <Input id="age" name="age" type="number" value={data.age} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="nakshatra" className="flex items-center gap-2"><Star className="h-4 w-4" /> നക്ഷത്രം (Nakshatra)</Label>
                <Input id="nakshatra" name="nakshatra" value={data.nakshatra} onChange={handleChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4" /> ഇമെയിൽ (Email)</Label>
                <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
            </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2"><Home className="h-4 w-4" /> വിലാസം (Address)</Label>
          <Textarea id="address" name="address" value={data.address} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dob" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> ജനന തീയതി (Date of Birth)</Label>
            <Input id="dob" name="dob" type="date" value={data.dob} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tob" className="flex items-center gap-2"><Clock className="h-4 w-4" /> ജനിച്ച സമയം (Time of Birth)</Label>
            <Input id="tob" name="tob" type="time" value={data.tob} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="pob" className="flex items-center gap-2"><MapPin className="h-4 w-4" /> ജനന സ്ഥലം (Birth Place)</Label>
                <Input id="pob" name="pob" value={data.pob} onChange={handleChange} />
            </div>
            <div className="space-y-2">
                <Label className="flex items-center gap-2"><VenetianMask className="h-4 w-4" /> ലിംഗം (Gender)</Label>
                <RadioGroup value={data.gender} onValueChange={handleGenderChange} className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">പുരുഷൻ (Male)</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">സ്ത്രീ (Female)</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">മറ്റുള്ളവ (Other)</Label></div>
                </RadioGroup>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Malayala മാസം</Label>
            <Select onValueChange={handleSelectChange('malayalamMonth')} value={data.malayalamMonth}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{MALAYALAM_MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Sunrise className="h-4 w-4" /> ആരൂഢം രാശി</Label>
            <Select onValueChange={handleSelectChange('arudhamRashi')} value={data.arudhamRashi}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{RASHI_OPTIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deepam" className="flex items-center gap-2"><Flame className="h-4 w-4" /> ദീപം</Label>
          <Textarea id="deepam" name="deepam" value={data.deepam} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prasnaChintha" className="flex items-center gap-2"><BrainCircuit className="h-4 w-4" /> പ്രശ്നചിന്ത</Label>
          <Textarea id="prasnaChintha" name="prasnaChintha" value={data.prasnaChintha} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Leaf className="h-4 w-4" /> താംബൂലം</Label>
            <Select onValueChange={handleSelectChange('thamboolam')} value={data.thamboolam}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{THAMBOOLAM_OPTIONS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Leaf className="h-4 w-4" /> താംബൂലം രാശി</Label>
            <Select onValueChange={handleSelectChange('thamboolamRashi')} value={data.thamboolamRashi}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{RASHI_OPTIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Atom className="h-4 w-4" /> താംബൂലം ഗ്രഹങ്ങൾ</Label>
            <Select onValueChange={handleSelectChange('thamboolamGrahangal')} value={data.thamboolamGrahangal}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{GRAHANGAL_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Sun className="h-4 w-4" /> 12 ഉദയ രാശികൾ</Label>
            <Select onValueChange={handleSelectChange('udayaRashikal')} value={data.udayaRashikal}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{RASHI_OPTIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Gem className="h-4 w-4" /> ലഗ്ന നവാംശകം</Label>
            <Select onValueChange={handleSelectChange('lagnaNavamsakam')} value={data.lagnaNavamsakam}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{RASHI_OPTIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Telescope className="h-4 w-4" /> സ്പഷ്ടാംഗ രാശി</Label>
            <Select onValueChange={handleSelectChange('spashtangaRashi')} value={data.spashtangaRashi}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{RASHI_OPTIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Moon className="h-4 w-4" /> ചന്ദ്രാരിഷ്ടി</Label>
            <Select onValueChange={handleSelectChange('chandrarishti')} value={data.chandrarishti}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CHANDRARISHTI_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pariharangal" className="flex items-center gap-2"><Shield className="h-4 w-4" /> പരിഹാരങ്ങൾ</Label>
          <Textarea id="pariharangal" name="pariharangal" value={data.pariharangal} onChange={handleChange} />
        </div>
      </CardContent>
    </Card>
  );
}
