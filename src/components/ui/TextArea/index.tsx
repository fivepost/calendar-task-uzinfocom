import type { FC, Ref, TextareaHTMLAttributes } from 'react'

interface IFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string
	label?: string
	ref?: Ref<HTMLTextAreaElement>
}

const TextArea: FC<IFieldProps> = ({ error, label, ...rest }) => {
	return (
		<div>
			{label && <label className='inline-block mb-1'>{label}</label>}
			<textarea
				className='resize-none rounded p-2 bg-white w-full focus:outline-none border border-gray-300 focus:border-blue-500 '
				{...rest}
			/>
			{error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
		</div>
	)
}

export default TextArea
