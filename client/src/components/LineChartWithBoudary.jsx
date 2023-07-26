const ErrorBoundary = ({ children }) => {
    const [error, setError] = useState(null);
  
    componentDidCatch(error) {
      setError(error);
      // You can also log the error to an error reporting service
      console.error(error);
    }
  
    if (error) {
      return <div>Something went wrong. Please try again later.</div>;
    }
  
    return children;
  };
  
const LineChartWithBoundary = () => {
    return (
      <ErrorBoundary>
        <LineChart />
      </ErrorBoundary>
    );
  };
  
  export default LineChartWithBoundary;