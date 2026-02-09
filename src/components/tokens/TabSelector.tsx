'use client';

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function TabSelector({ tabs, activeTab, onChange }: TabSelectorProps) {
  return (
    <div className="flex items-center gap-1 px-4 pt-1 border-b border-cream-300/60">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-3 py-2 text-[11px] font-medium transition-all border-b-2 -mb-px ${
            activeTab === tab.id
              ? 'text-forest/70 border-forest/40'
              : 'text-forest/25 border-transparent hover:text-forest/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
