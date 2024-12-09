/**
 * Below is the updated color schema for the Wedahamine application.
 * This schema includes additional colors for a broader range of UI elements.
 */

const primaryColorLight = '#3C8F53'; // Primary green, representing nature and health.
const primaryColorDark = '#81C784'; // Primary green for dark mode with better contrast.
const secondaryColorLight = '#FFB74D'; // Warm amber for secondary highlights.
const secondaryColorDark = '#FFAB40'; // Vibrant orange for dark mode secondary highlights.
const errorColorLight = '#E57373'; // Light red for error messages.
const errorColorDark = '#EF9A9A'; // Softer red for dark mode errors.
const successColorLight = '#4CAF50'; // Green for success messages.
const successColorDark = '#66BB6A'; // Softer green for success in dark mode.
const borderColorLight = '#E0E0E0'; // Light gray for borders in light mode.
const borderColorDark = '#424242'; // Dark gray for borders in dark mode.
const placeholderColorLight = '#9E9E9E'; // Neutral gray for placeholder text in light mode.
const placeholderColorDark = '#BDBDBD'; // Slightly brighter gray for dark mode placeholders.
const linkColorLight = '#007BFF'; // Bright blue for links in light mode.
const linkColorDark = '#4FC3F7'; // Softer cyan blue for links in dark mode.
const messageContainerErrorLight = 'rgba(244, 0, 0, 0.2)'; // dark Red tint for error messages in light mode.
const messageContainerErrorDark = 'rgba(255, 0, 0, 0.1)'; // Red tint for error messages in dark mode.
const messageContainerSuccessLight = 'rgba(76, 175, 80, 0.2)'; // Green tint for success messages in light mode.
const messageContainerSuccessDark = 'rgba(102, 187, 106, 0.1)'; // Green tint for success messages in dark mode.

export const Colors = {
  light: {
    text: '#2C3E50', // Deep blue-gray for high readability.
    background: '#F8F9FA', // Soft white for a clean interface.
    tint: primaryColorLight,
    icon: '#6B705C', // Earthy gray for icons.
    tabIconDefault: '#6B705C',
    tabIconSelected: primaryColorLight,
    buttonBackground: '#E8F5E9', // Light green for button backgrounds.
    notification: secondaryColorLight, // Amber for notifications to grab attention.
    error: errorColorLight, // Error messages or states.
    success: successColorLight, // Success messages or states.
    border: borderColorLight, // Border colors for inputs, cards, etc.
    placeholder: placeholderColorLight, // Placeholder text color.
    link: linkColorLight, // Bright blue for links.
    messageContainerError: messageContainerErrorLight, // Red tint for error messages.
    messageContainerSuccess: messageContainerSuccessLight, // Green tint for success messages.
  },
  dark: {
    text: '#E0E0E0', // Light gray for readability on dark backgrounds.
    background: '#1B1B1B', // Dark charcoal for less strain on eyes.
    tint: primaryColorDark,
    icon: '#BDBDBD', // Muted gray for icons.
    tabIconDefault: '#BDBDBD',
    tabIconSelected: primaryColorDark,
    buttonBackground: '#2E7D32', // Rich green for button backgrounds.
    notification: secondaryColorDark, // Vibrant orange for notifications.
    error: errorColorDark, // Error messages or states.
    success: successColorDark, // Success messages or states.
    border: borderColorDark, // Border colors for inputs, cards, etc.
    placeholder: placeholderColorDark, // Placeholder text color.
    link: linkColorDark, // Softer cyan blue for links.
    messageContainerError: messageContainerErrorDark, // Red tint for error messages.
    messageContainerSuccess: messageContainerSuccessDark, // Green tint for success
  },
};

/**
 * Additions:
 * - `error`: For error messages or indicators.
 * - `success`: For success states or messages.
 * - `border`: Colors for UI element borders.
 * - `placeholder`: Placeholder text color for better UX.
 * 
 * These additions ensure consistent design across the app while maintaining an Ayurvedic theme.
 */
