import type { PropsWithChildren, ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean
	className?: string
	variant?: 'primary' | 'secondary' | 'danger'
}

const Button: FC<PropsWithChildren<Props>> = ({
	disabled,
	className,
	children,
	variant = 'primary',
	...rest
}) => {
	return (
		<button
			{...rest}
			disabled={disabled}
			className={cn(
				'items-center cursor-pointer justify-center inline-flex gap-2 text-lg py-1 px-4 rounded-[5px] hover:opacity-80 text-sm transition border border-transparent shadow-sm',
				{
					'text-black': variant === 'primary',
					'text-white bg-blue-500': variant === 'secondary',
					'text-white bg-red-500': variant === 'danger'
				},
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
