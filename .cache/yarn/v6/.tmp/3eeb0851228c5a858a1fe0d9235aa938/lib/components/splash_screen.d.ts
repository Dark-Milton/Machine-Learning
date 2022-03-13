/** Non-exported class definition for the animated GCP logo splash screen. */
declare class SplashScreen {
    private readonly container;
    /** Displays the splash screen */
    show(): void;
    /** Hides the splash screen */
    hide(): void;
    /** Removes the splash screen from the DOM */
    remove(): void;
    private buildContainerDiv;
}
/** Singleton instance of the GCP splash screen. */
export declare const SPLASH_SCREEN: SplashScreen;
export {};
