import { ReactNode, createContext, useContext, useState } from "react";
import { ClassSectionContextProps } from "../types";
import { useGetTeacher, useSearchSubject } from "~/services";
import { IClassSection } from "~/types";
import { Form } from "antd";



export const ClassSectionContext = createContext<ClassSectionContextProps | any>('Context bảng class section');

export const ClassSectionProvider = ({
  children,
}: {
  children?: ReactNode | undefined
}) => {

  const { listTeacher } = useGetTeacher({
    status: 1
  })
  const { listSubject } = useSearchSubject({
    status: 1
  })
  const [initSearch, setInitSearch] = useState<IClassSection>({
    status: 1
  })
  const [form] = Form.useForm();
  const [edit, setEdit] = useState<boolean>(false)
  const [initValue, setInitValue] = useState<IClassSection>()

  const value = {
    listTeacher,
    listSubject,
    initSearch,
    setInitSearch,
    form,
    edit,
    setEdit,
    initValue,
    setInitValue
  }
  return <ClassSectionContext.Provider value={value as ClassSectionContextProps}>
    {children}
  </ClassSectionContext.Provider>
}


export const useClass = () => {
  return useContext(ClassSectionContext)
}