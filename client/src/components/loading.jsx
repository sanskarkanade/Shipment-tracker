const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex min-h-240px items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 h-6 w-6 rounded-full border-2 border-slate-300 border-t-slate-700"></div>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
};

export default Loading;