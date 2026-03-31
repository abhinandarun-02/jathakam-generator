'use client';

import type { AstroData } from '@/lib/types';


interface AstroDocumentPreviewProps {
  data: AstroData;
}

function PreviewField({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="font-medium w-32 shrink-0">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default function AstroDocumentPreview({ data }: AstroDocumentPreviewProps) {
  const {
    name, dob, tob, pob, gender, age, nakshatra, address, email,
    malayalamMonth, arudhamRashi, deepam, prasnaChintha, thamboolamRashi,
    thamboolam, thamboolamGrahangal, udayaRashikal, lagnaNavamsakam,
    spashtangaRashi, chandrarishti, pariharangal
  } = data;


  return (
    <div className="printable-area bg-white shadow-lg rounded-lg p-8 h-full w-full overflow-auto space-y-8 text-black">
      <header className="text-center ">
        <h1 className="text-xl text-center font-bold border-b pb-2 mb-4">ജ്യോതിഷ രേഖ</h1>
        <p>ഹരിശ്രീ ഗണപതയേ നമ: അവിഘ്‌നമസ്‌തു.</p>
        <p>ശ്രീ ഗുരുദ്യോ നമ:</p>
        <p>ശ്രീ ഗണപതയേ നമ:</p>
        <p>ശ്രീ സരസ്വത്യൈ നമ:</p>
        <p>ശ്രീ വേദവ്യാസായ നമ:</p>
        <p>ശ്രീമദ് ദക്ഷിണമൂർത്തയേ നമ:</p>
        <p>ശ്രീ സുബ്രഹ്മണ്യായ നമ:</p>
        <p>ശ്രീ സൂര്യാദി സർവ്വഗ്രഹേഭ്യോ നമ:</p>
        <p>ശ്രീ കുലദേവതാഭ്യോ നമ:</p>
        <p>ശ്രീ ഹയഗ്രീവായ നമ:</p>
        <p>ശ്രീ ഹരിഹരപുത്രായ നമ:</p>
        <p></p>
        <p>കോലാപുരവരവാസലോലാം ശക്തിത്രയാത്മികാം</p>
        <p>മൂകാംബികാമീം ഹിതകരീം നമാമി പരദേവതാം</p>
      </header>

      <section>
        <h2 className="text-lg font-bold border-b pb-2 mb-4">വ്യക്തിഗത വിവരങ്ങൾ</h2>
        <div className="space-y-2 text-sm">
          <PreviewField label="പേര്" value={name} />
          <PreviewField label="പ്രായം" value={age} />
          <PreviewField label="ജനന തീയതി" value={dob ? new Date(dob).toLocaleDateString('ml-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} />
          <PreviewField label="ജനിച്ച സമയം" value={tob} />
          <PreviewField label="ജനന സ്ഥലം" value={pob} />
          <PreviewField label="ലിംഗം" value={gender === 'male' ? 'പുരുഷൻ' : gender === 'female' ? 'സ്ത്രീ' : 'മറ്റുള്ളവ'} />
          <PreviewField label="നക്ഷത്രം" value={nakshatra} />
          <PreviewField label="ഇമെയിൽ" value={email} />
          <PreviewField label="വിലാസം" value={address} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold border-b pb-2 mb-4">ജ്യോതിഷപരമായ വിശദാംശങ്ങൾ</h2>
        <div className="space-y-2 text-sm">
          <PreviewField label="മലയാള മാസം" value={malayalamMonth} />
          <PreviewField label="ആരൂഢം രാശി" value={arudhamRashi} />
          <PreviewField label="താംബൂലം" value={thamboolam} />
          <PreviewField label="താംബൂലം രാശി" value={thamboolamRashi} />
          <PreviewField label="താംബൂലം ഗ്രഹങ്ങൾ" value={thamboolamGrahangal} />
          <PreviewField label="12 ഉദയ രാശികൾ" value={udayaRashikal} />
          <PreviewField label="ലഗ്ന നവാംശകം" value={lagnaNavamsakam} />
          <PreviewField label="സ്പഷ്ടാംഗ രാശി" value={spashtangaRashi} />
          <PreviewField label="ചന്ദ്രാരിഷ്ടി" value={chandrarishti} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold border-b pb-2 mb-4">പ്രശ്നചിന്തയും ഫലങ്ങളും</h2>
        <div className="space-y-4 text-sm whitespace-pre-wrap">
          <div>
            <h3 className="font-medium">ദീപം</h3>
            <p>{deepam || 'വിവരങ്ങൾ ലഭ്യമല്ല.'}</p>
          </div>
          <div>
            <h3 className="font-medium">പ്രശ്നചിന്ത</h3>
            <p>{prasnaChintha || 'വിവരങ്ങൾ ലഭ്യമല്ല.'}</p>
          </div>
        </div>
      </section>


      {pariharangal && (
        <section>
          <h2 className="text-lg font-bold border-b pb-2 mb-4">പരിഹാരങ്ങൾ</h2>
          <div className="space-y-4 text-sm whitespace-pre-wrap">
            <p>{pariharangal}</p>
          </div>
        </section>
      )}

    </div>
  );
}
