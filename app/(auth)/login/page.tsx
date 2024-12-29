import SignInForm from '../../components/auth/SignInForm'
export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold dark:text-white">Login</h1>
            <SignInForm />
        </div>
    )
}
