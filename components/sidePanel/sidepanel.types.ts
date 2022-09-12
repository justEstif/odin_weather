import { IUserSearch } from 'pages/index.interface'
import { Dispatch, SetStateAction } from 'react'

export type TFormProps = {
  setUserSearch: Dispatch<SetStateAction<IUserSearch>>
}

export type TConvertDrawer = {
  form: JSX.Element
}
