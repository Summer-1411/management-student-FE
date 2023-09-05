import { FormInstance } from "antd"
import { ITeacher } from "~/types"



export interface CreateUpdateProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  form: FormInstance<any>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
   edit: boolean
   setInitValue: React.Dispatch<React.SetStateAction<ITeacher | undefined>>
   initValue: ITeacher | undefined
}

export interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<ITeacher>>
}

export interface DetailTeacherProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  detailTeacher: ITeacher | undefined
}

