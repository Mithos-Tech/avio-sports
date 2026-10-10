import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#home';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020659] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold font-syncopate uppercase tracking-tight mb-4 text-avio-primary">
              AVIO SPORTS
            </h2>
            <p className="text-sm text-white/70 mb-6 font-space">
              Se ha detectado una anomalía momentánea. Puedes restablecer la interfaz de forma instantánea.
            </p>
            <button
              onClick={this.handleReset}
              className="px-8 py-3 rounded-full bg-avio-primary text-avio-secondary-2 font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 cursor-pointer"
            >
              Reiniciar Interfaz
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
