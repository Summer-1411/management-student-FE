import axios from "axios"
import { useState } from "react"
import { API, KEY_LOCAL, toastOption } from "~/contants"
import { IClass, IClassSection, IDepartment, IMajor, IStudent, ISubject, ITeacher } from "~/types"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useSearchDepartment = (params: IDepartment) => {
  const [result, setResult] = useState<IDepartment[]>([])
  const { data: response, ...props } = useQuery(
    ['list-department', params],
    () =>
      axios.post(`${API.DEPARTMENT}/search`, params),
    {

      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.department)
      },

    }
  )
  return {
    listDepartment: result,
    ...props,
  }
}
export const useSearchMajor = (params: IMajor) => {
  const [result, setResult] = useState<IMajor[]>([])
  const { data: response, ...props } = useQuery(
    ['list-major', params],
    () =>
      axios.post(`${API.MAJOR}/search`, params),
    {

      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.major)
      },

    }
  )
  return {
    listMajor: result,
    ...props,
  }
}

export const useSearchClass = (params: IClass) => {
  const [result, setResult] = useState<IClass[]>([])
  const { data: response, ...props } = useQuery(
    ['list-class', params],
    () =>
      axios.post(`${API.CLASS}/search`, params),
    {
      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.class)
      },

    }
  )
  return {
    listClass: result,
    ...props,
  }
}
export const useSearchClassSection = (params: IClassSection) => {
  const [result, setResult] = useState<IClassSection[]>([])
  const { data: response, ...props } = useQuery(
    ['list-class-section', params],
    () =>
      axios.post(`${API.CLASS_SECTION}/search`, params),
    {
      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.classSection)
      },

    }
  )
  return {
    listClassSection: result,
    ...props,
  }
}

export const useSearchSubject = (params: ISubject) => {
  const [result, setResult] = useState<ISubject[]>([])
  const { data: response, ...props } = useQuery(
    ['list-subject', params],
    () =>
      axios.post(`${API.SUBJECT}/search`, params),
    {
      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.subject)
      },

    }
  )
  return {
    listSubject: result,
    ...props,
  }
}

export const useSearchStudent = (params: IStudent) => {
  const [result, setResult] = useState<IStudent[]>([])
  const { data: response, ...props } = useQuery(
    ['list-student', params],
    () =>
      axios.post(`${API.STUDENT}/search`, params),
    {
      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.student)
      },

    }
  )
  return {
    listStudent: result,
    ...props,
  }
}


export const useGetTeacher = (params: ITeacher) => {

  const [result, setResult] = useState<ITeacher[]>([])
  const { data: response, ...props } = useQuery(
    ['list-teacher', params],
    () =>
      axios.post(`${API.TEACHER}/search`, params),
    {

      onSuccess: ({ ...res }) => {
        if (res.data) setResult(res.data.teacher)
      },

    }
  )
  return {
    listTeacher: result,
    ...props,
  }
}

export function useCreateTeacher() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-teacher',
    (params: ITeacher) => {
      return axios.post(`${API.TEACHER}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-teacher')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-teacher',
    (params: ITeacher) => {
      return axios.put(`${API.TEACHER}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-teacher')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-student',
    (params: IStudent) => {
      return axios.post(`${API.STUDENT}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-student')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}
export function useUpdateStudent() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-student',
    (params: IStudent) => {
      return axios.put(`${API.STUDENT}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-student')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useCreateSubject() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-subject',
    (params: ISubject) => {
      return axios.post(`${API.SUBJECT}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-subject')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useUpdateSubject() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-subject',
    (params: ISubject) => {
      return axios.put(`${API.SUBJECT}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-subject')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}


export function useCreateDepartment() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-department',
    (params: IDepartment) => {
      return axios.post(`${API.DEPARTMENT}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-department')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}


export function useUpdateDepartment() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-department',
    (params: IDepartment) => {
      return axios.put(`${API.DEPARTMENT}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-department')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useCreateMajor() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-major',
    (params: IMajor) => {
      return axios.post(`${API.MAJOR}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-major')
        toast.success("Lưu dữ liệu thành công", toastOption);
      }
    }
  )
}
export function useUpdateMajor() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-major',
    (params: IMajor) => {
      return axios.put(`${API.MAJOR}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-major')
        toast.success("Lưu dữ liệu thành công", toastOption);
      }
    }
  )
}

export function useCreateClass() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-class',
    (params: IClass) => {
      return axios.post(`${API.CLASS}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-class')
        toast.success("Lưu dữ liệu thành công", toastOption);
      }
    }
  )
}
export function useUpdateClass() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-class',
    (params: IClass) => {
      return axios.put(`${API.CLASS}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-class')
        toast.success("Lưu dữ liệu thành công", toastOption);
      }
    }
  )
}

export function useCreateClassSection() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-class-section',
    (params: IClassSection) => {
      return axios.post(`${API.CLASS_SECTION}/create`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-class-section')
        toast.success("Xóa khoa thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useUpdateClassSection() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-class-section',
    (params: IClassSection) => {
      return axios.put(`${API.CLASS_SECTION}/${params.id}`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-class-section')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}


export function useDeleteDepartment() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-department',
    (params: { ids: number[] }) => {
      return axios.post(`${API.DEPARTMENT}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-department')
        toast.success("Xóa khoa thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useDeleteMajor() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-major',
    (params: { ids: number[] }) => {
      return axios.post(`${API.MAJOR}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-major')
        toast.success("Xóa ngành thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}

export function useDeleteClass() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-class',
    (params: { ids: number[] }) => {
      return axios.post(`${API.CLASS}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-class')
        toast.success("Xóa lớp thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}


export function useDeleteStudent() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-student',
    (params: { ids: number[] }) => {
      return axios.post(`${API.STUDENT}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-student')
        toast.success("Xóa sinh viên thành công", toastOption);
      },
      onError: async (error : {
        response : {
          data : {
            message: string
          }
        }
      }) => {
        toast.error(error?.response.data.message, toastOption);
      }
    }
  )
}


export function useDeleteTeacher() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-teacher',
    (params: { ids: number[] }) => {
      return axios.post(`${API.TEACHER}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-teacher')
      }
    }
  )
}

export function useDeleteSubject() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-subject',
    (params: { ids: number[] }) => {
      return axios.post(`${API.SUBJECT}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-subject')
      }
    }
  )
}

export function useDeleteClassSection() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-class-section',
    (params: { ids: number[] }) => {
      return axios.post(`${API.CLASS_SECTION}/delete`, params, {
        headers: { Authorization: `Bearer ${localStorage[KEY_LOCAL]}` }
      })
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-class-section')
      }
    }
  )
}


// export function useSearchService(params: IQueryRequest<Service>) {
//   const [result, setResult] = useState<any>()
//   const { data: response, ...props } = useQuery<ResponseType<Service[]>>(
//     ['list-service', params],
//     () =>
//       request.post<ResponseType<Service[]>>(
//         PREFIX_API.PRODUCTCATALOG + API.PRODUCT_CATALOG.SERVICE.SEARCH,
//         params
//       ),
//     {
//       onSuccess: ({ ...res }) => {
//         if (res.data) setResult(res.data)
//       },
//     }
//   )
//   return {
//     lstService: result?.content,
//     totalElements: result?.totalElements,
//     ...props,
//   }
// }


// export function useUpdateService(options?: Record<string, any>) {
//   const intl = useIntl()
//   const queryClient = useQueryClient()
//   const { setRowKeyFocus } = useService()
//   return useMutation(
//     'update-Service',
//     (params: Service) => {
//       return request.post<Service>(
//         PREFIX_API.PRODUCTCATALOG + API.PRODUCT_CATALOG.SERVICE.UPDATE,
//         params
//       )
//     },
//     {
//       onSuccess: async (data, variables, context) => {
//         //call this to validate function query list sample
//         await queryClient.invalidateQueries('list-service')
//         await queryClient.invalidateQueries('get-service-child-limit')
//         setRowKeyFocus(data.data.itemId)
//         notification.success({
//           message: intl.formatMessage({
//             id: 'serviceManagement.notification.update',
//           }),
//           description: intl.formatMessage({
//             id: 'serviceManagement.message.updateSuccess',
//           }),
//         })
//       },
//       onError: (error: Error) => {
//         notification.error({
//           message: intl.formatMessage({
//             id: 'serviceManagement.notification.update',
//           }),
//           description: intl.formatMessage({
//             id: 'serviceManagement.message.' + error.message,
//             defaultMessage: intl.formatMessage({
//               id: 'serviceManagement.message.updateError',
//             }),
//           }),
//         })
//       },
//     }
//   )
// }