# NOREL - Non-paper Relay Identity System


NOREL is a comprehensive Next.js application designed to streamline identity sharing and form-filling processes. It provides a secure, "tap-to-fill" solution for modern institutions like banks, hospitals, and public services, reducing the reliance on paper forms. The system allows users to create detailed identity profiles, share them securely via QR codes or NFC, and automatically populate forms at receiving kiosks.

The application also includes advanced features like an AI-powered document processor, custom form builders, and a showcase of potential third-party integrations.

## Key Features

*   **Dashboard**: A central hub providing an overview of profiles, recent activity, and quick access to core features.
*   **Comprehensive Profile Management**: Create, edit, and manage detailed user profiles with information spanning personal, contact, financial, and medical data.
*   **Secure Sharing**: Generate time-sensitive, data-encoded QR codes and NFC-compatible data for sharing profiles.
*   **Kiosk Mode**: A dedicated interface to receive shared profile data and automatically populate various institutional forms.
*   **Document Generation**: Create pre-filled documents from standardized templates for banking, medical, and government services.
*   **AI Document Processing**: Upload documents (PDFs, images) and use AI to automatically extract, categorize, and validate information.
*   **Form-Craft Suite**:
    *   **Form Builder**: A drag-and-drop interface to create custom form templates.
    *   **AI Form Generator**: Generate complex forms from a simple text description using AI.
*   **Integrations Showcase**: A visual catalog of potential integrations with services for storage, AI, security, and communication.
*   **Customizable Settings**: Manage application preferences, data retention policies, and export or clear all local data.
*   **Theming**: Includes a modern, responsive UI with support for both light and dark modes.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), and [Vaul](https://vaul.emilkowal.ski/).
*   **State Management**: React Hooks & Context API
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Charts**: [Recharts](https://recharts.org/)
*   **QR Code Generation**: [qrcode.react](https://github.com/zpao/qrcode.react)

## Application Structure

The application is organized around several key pages within the `app/` directory:

| Path                    | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `/`                     | The main dashboard with stats and quick actions.                            |
| `/profiles`             | View and manage all created identity profiles.                              |
| `/profile/create`       | A comprehensive form to create a new, detailed user profile.                |
| `/share`                | Generate QR codes or prepare NFC data for sharing a selected profile.       |
| `/kiosk`                | The receiving end for shared data, used to auto-fill institutional forms.   |
| `/documents`            | Generate downloadable documents from pre-defined templates and profile data.|
| `/upload`               | Upload documents for AI-powered data extraction and categorization.         |
| `/form-craft`           | A visual, drag-and-drop interface for building custom forms.                |
| `/ai-forms`             | Generate form structures by describing needs to an AI.                      |
| `/integrations`         | A page showcasing potential third-party service integrations.               |
| `/settings`             | Configure application settings and manage local data.                       |

*Note: Data persistence is currently managed via the browser's `localStorage`.*

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ralein/norel-app.git
    cd norel-app
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as the package manager.
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
