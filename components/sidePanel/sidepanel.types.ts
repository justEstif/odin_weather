import { Dispatch, SetStateAction } from 'react'

export type TFormProps = {
  setCity: Dispatch<SetStateAction<string>>
}

export type TConvertDrawer = {
  form: JSX.Element
}
