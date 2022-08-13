import React from 'react';

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

	public state: ErrorBoundaryState = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Sorry.. there was an error</h1>
				</div>
			);
		}

		return this.props.children;
	}

}

export default ErrorBoundary;
