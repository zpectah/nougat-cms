import React from 'react';

import config from '../../config';
import { FONT_FAMILY_ROOT } from '../../const';
import routes from '../../routes';
import palette from '../../styles/palette';

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null,
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

	public state: ErrorBoundaryState = {
		hasError: false,
		error: null,
	};

	public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
		};
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						width: '100%',
						height: '100%',
						minHeight: '500px',
						margin: 0,
						padding: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						fontFamily: FONT_FAMILY_ROOT,
						fontWeight: 400,
						fontSize: '1rem',
						backgroundColor: palette.light,
						color: palette.dark,
					}}
				>
					<div
						style={{
							width: '100%',
							height: 'auto',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							flex: 'auto',
							gap: '1rem',
							textAlign: 'center',
						}}
					>
						<h1
							style={{
								fontSize: '2.25rem',
							}}
						>
							{config.constants.CMS.name}: Application Error
						</h1>
						<p>
							We're sorry, but unfortunately there was a problem with the app. You can try reloading the page or clearing the browser cache. If problems persist, contact your administrator.
							<br />
							<a
								href={routes.Dashboard.path as string}
								style={{
									padding: '.5rem .75rem',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '.5rem',
									textAlign: 'center',
									whiteSpace: 'nowrap',
									fontWeight: 700,
									backgroundColor: palette.primary,
									color: palette.light,
									borderRadius: '.125rem',
								}}
							>
								Return to dashboard
							</a>
						</p>
						{this.state.error && (
							<div
								style={{
									flex: 'auto',
									overflow: 'scroll',
									fontSize: '.85rem',
									backgroundColor: 'rgba(200,200,200,.5)',
									color: palette.primary,
								}}
							>
									<pre>
										<code>
											{JSON.stringify(this.state.error, null, 2)}
										</code>
									</pre>
							</div>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}

}

export default ErrorBoundary;
