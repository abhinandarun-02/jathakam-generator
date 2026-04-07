"use client";

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
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AstroData, PariharaItem } from "@/lib/types";

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

const PARIHARAM_GOD_OPTIONS = [
  "ശ്രീ ഗണപതി",
  "ശിവൻ",
  "പാർവതി ദേവി",
  "ശ്രീകൃഷ്ണൻ",
  "ശ്രീ മഹാവിഷ്ണു",
  "അയ്യപ്പൻ",
  "സുബ്രഹ്മണ്യൻ",
  "ഹനുമാൻ",
  "ഭദ്രകാളി",
  "നാഗദേവത",
] as const;

const GENDER_OPTIONS = [
  { value: "male", label: "പുരുഷൻ" },
  { value: "female", label: "സ്ത്രീ" },
] as const;

function getDefaultPariharam(deity: string) {
  return `${deity} പ്രാർത്ഥന നടത്തുക`;
}

const TEMPLE_NAMES: Record<string, string[]> = {
  "ശ്രീ ഗണപതി": [
    "പഴവങ്ങാടി ഗണപതി ക്ഷേത്രം, തിരുവനന്തപുരം",
    "കൊട്ടാരക്കര മഹാഗണപതി ക്ഷേത്രം, കൊല്ലം",
    "മധൂർ ശ്രീ മദനന്തേശ്വര സിദ്ധിവിനായക ക്ഷേത്രം, കാസർഗോഡ്"
  ],
  "ശിവൻ": [
    "വടക്കുന്നാഥൻ ക്ഷേത്രം, തൃശ്ശൂർ",
    "വൈക്കം മഹാദേവ ക്ഷേത്രം, കോട്ടയം",
    "ഏറ്റുമാനൂർ മഹാദേവ ക്ഷേത്രം, കോട്ടയം"
  ],
  "പാർവതി ദേവി": [
    "ആറ്റുകാൽ ഭഗവതി ക്ഷേത്രം, തിരുവനന്തപുരം",
    "ചോറ്റാനിക്കര ഭഗവതി ക്ഷേത്രം, എറണാകുളം",
    "കടമ്പുഴ ഭഗവതി ക്ഷേത്രം, മലപ്പുറം"
  ],
  "ശ്രീകൃഷ്ണൻ": [
    "ഗുരുവായൂർ ശ്രീകൃഷ്ണ ക്ഷേത്രം, തൃശ്ശൂർ",
    "അമ്പലപ്പുഴ ശ്രീകൃഷ്ണ സ്വാമി ക്ഷേത്രം, ആലപ്പുഴ",
    "തിരുവാർപ്പ് ശ്രീകൃഷ്ണ സ്വാമി ക്ഷേത്രം, കോട്ടയം"
  ],
  "ശ്രീ മഹാവിഷ്ണു": [
    "ശ്രീ പത്മനാഭസ്വാമി ക്ഷേത്രം, തിരുവനന്തപുരം",
    "തിരുനെല്ലി ക്ഷേത്രം, വയനാട്",
    "തൃക്കാക്കര വാമനമൂർത്തി ക്ഷേത്രം, എറണാകുളം"
  ],
  "അയ്യപ്പൻ": [
    "ശബരിമല ധർമ്മശാസ്താ ക്ഷേത്രം, പത്തനംതിട്ട",
    "എരുമേലി ധർമ്മശാസ്താ ക്ഷേത്രം, കോട്ടയം",
    "കുളത്തൂപ്പുഴ ധർമ്മശാസ്താ ക്ഷേത്രം, കൊല്ലം"
  ],
  "സുബ്രഹ്മണ്യൻ": [
    "ഹരിപ്പാട് സുബ്രഹ്മണ്യ സ്വാമി ക്ഷേത്രം, ആലപ്പുഴ",
    "ഉദയനാപുരം സുബ്രഹ്മണ്യ സ്വാമി ക്ഷേത്രം, കോട്ടയം",
    "കിടങ്ങൂർ സുബ്രഹ്മണ്യ സ്വാമി ക്ഷേത്രം, കോട്ടയം"
  ],
  "ഹനുമാൻ": [
    "ആലത്തിയൂർ ഹനുമാൻ ക്ഷേത്രം, മലപ്പുറം",
    "കവിയൂർ ഹനുമാൻ ക്ഷേത്രം, പത്തനംതിട്ട",
    "പാളയം ആഞ്ചനേയ ക്ഷേത്രം, തിരുവനന്തപുരം"
  ],
  "ഭദ്രകാളി": [
    "കൊടുങ്ങല്ലൂർ ഭഗവതി ക്ഷേത്രം, തൃശ്ശൂർ",
    "തിരുമാന്ധാംകുന്ന് ഭഗവതി ക്ഷേത്രം, മലപ്പുറം",
    "പനയന്നാർകാവ് ദേവി ക്ഷേത്രം, പത്തനംതിട്ട"
  ],
  "നാഗദേവത": [
    "മണ്ണാറശാല നാഗരാജ ക്ഷേത്രം, ആലപ്പുഴ",
    "വെട്ടിക്കാട്ട് ആദിത്യപുരം നാഗരാജ ക്ഷേത്രം, ആലപ്പുഴ",
    "പാമ്പുമ്മേക്കാട് മന, തൃശ്ശൂർ"
  ]
};

function idSafe(s: string) {
  return s.replace(/\s+/g, "-");
}

function serializePariharaItems(items: PariharaItem[]) {
  // Flatten enabled temples across all parihara items and serialize them
  return items
    .flatMap((item) =>
      (item.temples ?? []).filter((t) => t.enabled).map((t) => ({
        deity: item.deity,
        temple: t.name,
        remedy: t.remedy,
      })),
    )
    .map((x) => `${x.deity} - ${x.temple}\n${x.remedy}`)
    .join("\n\n");
}

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
        <SelectContent position="popper">
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
  const pariharamAnchor = useComboboxAnchor();
  const pariharaItems = data.pariharaItems ?? [];
  const selectedPariharams = pariharaItems.map((item) => item.deity);

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

  const handlePariharaSelectionChange = (selectedValues: string[]) => {
    setData((prev) => {
      const nextItems = selectedValues.map((deity) => {
        const existingItem = prev.pariharaItems?.find(
          (item) => item.deity === deity,
        );

        if (existingItem) return existingItem;

        const placeholders = TEMPLE_NAMES[deity] ?? [`${deity} ക്ഷേത്രം`];

        const temples = placeholders.map((name) => ({
          name,
          remedy: "",
          enabled: false,
        }));

        return { deity, temples };
      });

      return {
        ...prev,
        pariharaItems: nextItems,
        pariharangal: serializePariharaItems(nextItems),
      };
    });
  };
  const handleTempleToggle = (
    deity: string,
    templeName: string,
    enabled: boolean,
  ) => {
    setData((prev) => {
      const nextItems =
        prev.pariharaItems?.map((item) =>
          item.deity === deity
            ? {
                ...item,
                temples: item.temples.map((t) =>
                  t.name === templeName
                    ? {
                        ...t,
                        enabled,
                        remedy:
                          enabled && !t.remedy
                            ? getDefaultPariharam(deity)
                            : t.remedy,
                      }
                    : t,
                ),
              }
            : item,
        ) ?? [];

      return {
        ...prev,
        pariharaItems: nextItems,
        pariharangal: serializePariharaItems(nextItems),
      };
    });
  };

  const handleTempleRemedyChange = (
    deity: string,
    templeName: string,
    remedy: string,
  ) => {
    setData((prev) => {
      const nextItems =
        prev.pariharaItems?.map((item) =>
          item.deity === deity
            ? {
                ...item,
                temples: item.temples.map((t) =>
                  t.name === templeName ? { ...t, remedy } : t,
                ),
              }
            : item,
        ) ?? [];

      return {
        ...prev,
        pariharaItems: nextItems,
        pariharangal: serializePariharaItems(nextItems),
      };
    });
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
            <FormField id="gender" label="ലിംഗം (Gender)" icon={VenetianMask}>
              <RadioGroup
                value={data.gender}
                onValueChange={handleGenderChange}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {GENDER_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-2 rounded-md border px-3 py-2 lg:h-9"
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
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              id="malayalamMonth"
              label="മലയാള മാസം"
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
            <div className="space-y-3">
              <Combobox
                multiple
                value={selectedPariharams}
                onValueChange={(value) =>
                  handlePariharaSelectionChange(
                    Array.isArray(value) ? value : [],
                  )
                }
              >
                <ComboboxChips ref={pariharamAnchor}>
                  {selectedPariharams.map((deity) => (
                    <ComboboxChip key={deity}>{deity}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    id="pariharangal"
                    aria-label="പരിഹാരങ്ങൾ"
                    placeholder="ദേവതകൾ തിരഞ്ഞെടുക്കുക"
                  />
                </ComboboxChips>
                <ComboboxContent anchor={pariharamAnchor}>
                  <ComboboxList>
                    {PARIHARAM_GOD_OPTIONS.map((option) => (
                      <ComboboxItem key={option} value={option}>
                        {option}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>

              <div className="space-y-3">
                {pariharaItems.map((item) => (
                  <div key={item.deity} className="space-y-2">
                    <div className="font-medium">{item.deity}</div>

                    <div className="space-y-2 pl-4">
                      {item.temples.map((t) => (
                        <div key={t.name} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`temple-checkbox-${idSafe(item.deity)}-${idSafe(
                                t.name,
                              )}`}
                              checked={!!t.enabled}
                              onCheckedChange={(checked) =>
                                handleTempleToggle(
                                  item.deity,
                                  t.name,
                                  typeof checked === "boolean" ? checked : false,
                                )
                              }
                            />
                            <Label
                              htmlFor={`temple-checkbox-${idSafe(
                                item.deity,
                              )}-${idSafe(t.name)}`}
                            >
                              {t.name}
                            </Label>
                          </div>

                          {t.enabled && (
                            <Textarea
                              id={`temple-remedy-${idSafe(item.deity)}-${idSafe(
                                t.name,
                              )}`}
                              value={t.remedy}
                              onChange={(event) =>
                                handleTempleRemedyChange(
                                  item.deity,
                                  t.name,
                                  event.target.value,
                                )
                              }
                              placeholder={`${item.deity} ${t.name} പരിഹാരം`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FormField>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
