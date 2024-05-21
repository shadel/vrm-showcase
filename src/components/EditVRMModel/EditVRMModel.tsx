// src/components/EditVRMModel/EditVRMModel.tsx
import { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useVRMStore } from '../../hooks/useVRMStore'
import log from '../../utils/logger'
import { VRMModel } from '../../types'

interface EditVRMModelProps {
  model: VRMModel
  onClose: () => void
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
})

const EditVRMModel = ({ model, onClose }: EditVRMModelProps) => {
  const editVRMModel = useVRMStore((state) => state.editVRMModel)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formik = useFormik({
    initialValues: {
      name: model.name,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedModel: Partial<VRMModel> = { name: values.name }
      if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        const file = fileInputRef.current.files[0]
        updatedModel.vrmUrl = URL.createObjectURL(file)
      }
      editVRMModel(model.id, updatedModel)
      log.info('Updated VRM model:', values.name)
      onClose()
    },
  })

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="flex-1">
                <label htmlFor="vrm-file" className="block text-sm font-medium text-gray-700">
                  VRM File (optional)
                </label>
                <input
                  id="vrm-file"
                  name="vrm-file"
                  type="file"
                  ref={fileInputRef}
                  accept=".vrm"
                  className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditVRMModel