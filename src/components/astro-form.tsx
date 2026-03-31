"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AstroData } from "@/lib/types";
import {
  Atom,
  BookOpen,
  BrainCircuit,
  Calendar,
  Clock,
  Flame,
  Gem,
  Hash,
  Home,
  Leaf,
  Mail,
  MapPin,
  Moon,
  Shield,
  Star,
  Sun,
  Sunrise,
  Telescope,
  User,
  VenetianMask,
} from "lucide-react";

interface AstroFormProps {
  data: AstroData;
  setData: React.Dispatch<React.SetStateAction<AstroData>>;
}

const MALAYALAM_MONTHS = [
  "ചിങ്ങം",
  "കന്നി",
  "തുലാം",
  "വൃശ്ചികം",
  "ധനു",
  "മകരം",
  "കുംഭം",
  "മീനം",
  "മേടം",
  "ഇടവം",
  "മിഥുനം",
  "കർക്കടകം",
];
const RASHI_OPTIONS = [
  "മേടം",
  "ഇടവം",
  "മിഥുനം",
  "കർക്കടകം",
  "ചിങ്ങം",
  "കന്നി",
  "തുലാം",
  "വൃശ്ചികം",
  "ധനു",
  "മകരം",
  "കുംഭം",
  "മീനം",
];
const GRAHANGAL_OPTIONS = [
  "സൂര്യൻ",
  "ചന്ദ്രൻ",
  "ചൊവ്വ",
  "ബുധൻ",
  "വ്യാഴം",
  "ശുക്രൻ",
  "ശനി",
  "രാഹു",
  "കേതു",
];
const CHANDRARISHTI_OPTIONS = ["ഉണ്ട്", "ഇല്ല"];
const THAMBOOLAM_OPTIONS = ["വെറ്റില", "അടയ്ക്ക", "പഴം", "പണം"];

const GENDER_OPTIONS = [
  { value: "male", label: "പുരുഷൻ" },
  { value: "female", label: "സ്ത്രീ" },
] as const;

function FormField({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>
        <Icon className="h-4 w-4" />
        {label}
      </FieldLabel>
      <FieldContent>{children}</FieldContent>
    </Field>
  );
}

function SelectField({
  id,
  label,
  icon: Icon,
  value,
  options,
  placeholder,
  onValueChange,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value?: string;
  options: readonly string[];
  placeholder: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <FormField id={id} label={label} icon={Icon}>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger id={id} aria-label={label} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

export default function AstroForm({ data, setData }: AstroFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: "male" | "female" | "other") => {
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
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField id="name" label="പേര് (Name)" icon={User}>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="പേര് നൽകുക"
              />
            </FormField>
            <FormField id="age" label="പ്രായം (Age)" icon={Hash}>
              <Input
                id="age"
                name="age"
                type="number"
                value={data.age ?? ""}
                onChange={handleChange}
                placeholder="പ്രായം നൽകുക"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField id="nakshatra" label="നക്ഷത്രം (Nakshatra)" icon={Star}>
              <Input
                id="nakshatra"
                name="nakshatra"
                value={data.nakshatra ?? ""}
                onChange={handleChange}
                placeholder="നക്ഷത്രം നൽകുക"
              />
            </FormField>
            <FormField id="email" label="ഇമെയിൽ (Email)" icon={Mail}>
              <Input
                id="email"
                name="email"
                type="email"
                value={data.email ?? ""}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </FormField>
          </div>

          <FormField id="address" label="വിലാസം (Address)" icon={Home}>
            <Textarea
              id="address"
              name="address"
              value={data.address ?? ""}
              onChange={handleChange}
              placeholder="വിലാസം നൽകുക"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            
            <FormField
              id="dob"
              label="ജനന തീയതി (Date of Birth)"
              icon={Calendar}
            >
              <Input
                id="dob"
                name="dob"
                type="date"
                value={data.dob}
                onChange={handleChange}
              />
            </FormField>
            <FormField id="tob" label="ജനിച്ച സമയം (Time of Birth)" icon={Clock}>
              <Input
                id="tob"
                name="tob"
                type="time"
                value={data.tob}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField id="pob" label="ജനന സ്ഥലം (Birth Place)" icon={MapPin}>
              <Input
                id="pob"
                name="pob"
                value={data.pob}
                onChange={handleChange}
                placeholder="ജനന സ്ഥലം നൽകുക"
              />
            </FormField>
            <Field>
              <FieldSet>
                <FieldLegend className="flex items-center gap-2">
                  <VenetianMask className="h-4 w-4" />
                  ലിംഗം
                </FieldLegend>
                <RadioGroup
                  value={data.gender}
                  onValueChange={handleGenderChange}
                  className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 rounded-md border px-3 py-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        aria-label={option.label}
                      />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FieldSet>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              id="malayalamMonth"
              label="Malayala മാസം"
              icon={BookOpen}
              value={data.malayalamMonth}
              options={MALAYALAM_MONTHS}
              placeholder="മാസം തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("malayalamMonth")}
            />
            <SelectField
              id="arudhamRashi"
              label="ആരൂഢം രാശി"
              icon={Sunrise}
              value={data.arudhamRashi}
              options={RASHI_OPTIONS}
              placeholder="രാശി തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("arudhamRashi")}
            />
          </div>

          <FormField id="deepam" label="ദീപം" icon={Flame}>
            <Textarea
              id="deepam"
              name="deepam"
              value={data.deepam ?? ""}
              onChange={handleChange}
              placeholder="ദീപത്തിന്റെ വിവരങ്ങൾ നൽകുക"
            />
          </FormField>

          <FormField id="prasnaChintha" label="പ്രശ്നചിന്ത" icon={BrainCircuit}>
            <Textarea
              id="prasnaChintha"
              name="prasnaChintha"
              value={data.prasnaChintha ?? ""}
              onChange={handleChange}
              placeholder="പ്രശ്നചിന്തയുടെ വിവരങ്ങൾ നൽകുക"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SelectField
              id="thamboolam"
              label="താംബൂലം"
              icon={Leaf}
              value={data.thamboolam}
              options={THAMBOOLAM_OPTIONS}
              placeholder="താംബൂലം തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("thamboolam")}
            />
            <SelectField
              id="thamboolamRashi"
              label="താംബൂലം രാശി"
              icon={Leaf}
              value={data.thamboolamRashi}
              options={RASHI_OPTIONS}
              placeholder="രാശി തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("thamboolamRashi")}
            />
            <SelectField
              id="thamboolamGrahangal"
              label="താംബൂലം ഗ്രഹങ്ങൾ"
              icon={Atom}
              value={data.thamboolamGrahangal}
              options={GRAHANGAL_OPTIONS}
              placeholder="ഗ്രഹം തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("thamboolamGrahangal")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              id="udayaRashikal"
              label="12 ഉദയ രാശികൾ"
              icon={Sun}
              value={data.udayaRashikal}
              options={RASHI_OPTIONS}
              placeholder="രാശി തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("udayaRashikal")}
            />
            <SelectField
              id="lagnaNavamsakam"
              label="ലഗ്ന നവാംശകം"
              icon={Gem}
              value={data.lagnaNavamsakam}
              options={RASHI_OPTIONS}
              placeholder="രാശി തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("lagnaNavamsakam")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              id="spashtangaRashi"
              label="സ്പഷ്ടാംഗ രാശി"
              icon={Telescope}
              value={data.spashtangaRashi}
              options={RASHI_OPTIONS}
              placeholder="രാശി തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("spashtangaRashi")}
            />
            <SelectField
              id="chandrarishti"
              label="ചന്ദ്രാരിഷ്ടി"
              icon={Moon}
              value={data.chandrarishti}
              options={CHANDRARISHTI_OPTIONS}
              placeholder="ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക"
              onValueChange={handleSelectChange("chandrarishti")}
            />
          </div>

          <FormField id="pariharangal" label="പരിഹാരങ്ങൾ" icon={Shield}>
            <Textarea
              id="pariharangal"
              name="pariharangal"
              value={data.pariharangal ?? ""}
              onChange={handleChange}
              placeholder="പരിഹാരങ്ങൾ ഇവിടെ നൽകുക"
            />
          </FormField>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
