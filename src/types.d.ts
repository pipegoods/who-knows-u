export type FlagData = {
  dial_code: string
  name: string
  image: string
}

export type CountryFlag = FlagData & {
  code: string
  emoji: string
  unicode: string
}

export type Country = FlagData & {
  code: string
}

export interface CountryDropdownPanelProps {
  dropdownRef: React.RefObject<HTMLDivElement>
  buttonPosition?: { top: number; left: number; width: number } | null
  dialCode: string
  countries: Country[]
  onClose: () => void
  onCountrySelect: (dialCode: string) => void
  listboxId: string
}
