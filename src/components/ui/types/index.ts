import { IStudent } from "~/types";

export interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

export interface DetailStudentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}




export interface ListStudentProps {
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>
  data: IStudent[]
  setDetailStudent?: React.Dispatch<React.SetStateAction<IStudent | undefined>>
  
}