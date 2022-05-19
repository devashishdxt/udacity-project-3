type Props = {
    address: string | null;
};

const Home = ({ address }: Props) => {
    return (
        <div className="page">
            <div className="page-content text-center">
                <h1 className="text-3xl mx-auto py-10 font-bold text-slate-900">Welcome to Supply Chain DApp</h1>
                <span className="text-sm mx-auto my-8 py-2 px-6 text-slate-700 bg-slate-200 shadow hover:bg-slate-300 transition-all cursor-pointer"><code className="text-green-600">{address}</code></span>
            </div>
        </div>
    )
};

export default Home;
