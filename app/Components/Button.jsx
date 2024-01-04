'use client'
import { useFormStatus } from 'react-dom'

const Button = ({val}) => {
    const { pending } = useFormStatus()

    return (
        <button aria-disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submut">
                {pending ? val+"..." : val}          
                  </button>
    )
}

export default Button