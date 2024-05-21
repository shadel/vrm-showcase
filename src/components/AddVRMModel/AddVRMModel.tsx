// src/components/AddVRMModel/AddVRMModel.tsx
import { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useVRMStore } from '../../hooks/useVRMStore'
import log from '../../utils/logger'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
})

const AddVRMModel = () => {
  const addVRMModel = useVRMStore((state) => state.addVRMModel)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        const file = fileInputRef.current.files[0]
        addVRMModel(values.name, file)
        formik.resetForm()
        fileInputRef.current.value = ''
        log.info('Added VRM model:', values.name)
      }
    },
  })

  return (
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
            VRM File
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
      <div>
        <button
          type="submit"
          className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Model
        </button>
      </div>
    </form>
  )
}

export default AddVRMModel