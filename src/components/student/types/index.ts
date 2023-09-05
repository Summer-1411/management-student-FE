import { FormInstance } from "antd"
import { IClass, IStudent } from "~/types"

export interface DataTypeTable {
  id?: React.Key
  avatar?: string
  account?: string
  name?: string
  email?: string
  nationality?: string
  nation?: string
  address?: string
  phoneNumber?: string
  idCode?: string
  birthday?: string
  id_class?: string
  deleted?: string
}

export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ViewProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export interface StudentContextProps {
  listClass: IClass[]
  formCreateUpdate: FormInstance<any>
  detailStudent: IStudent | undefined
  setDetailStudent: React.Dispatch<React.SetStateAction<IStudent | undefined>>
  openView: boolean
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  edit: boolean
  initValue: IStudent | undefined
  setInitValue: React.Dispatch<React.SetStateAction<IStudent | undefined>>
}