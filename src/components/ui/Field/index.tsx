import type { FC, InputHTMLAttributes, Ref } from 'react'

interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string
	label?: string
	ref?: Ref<HTMLInputElement>
}

const Field: FC<IFieldProps> = ({ error, label, ...rest }) => {
	return (
		<div>
			{label && <label className='inline-block mb-1'>{label}</label>}
			<input
				className='rounded px-4 py-2  w-full focus:outline-none focus:border-blue-500  border border-gray-300'
				{...rest}
				autoComplete='off'
			/>
			{error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
		</div>
	)
}

export default Field
