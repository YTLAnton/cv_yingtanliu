const fs = require('fs-extra');
const { marked } = require('marked');
const path = require('path');

// Configure marked to handle common MD features
marked.setOptions({
    breaks: true,
    gfm: true
});

async function build() {
    try {
        const mdPath = path.join(__dirname, '../resume.md');
        const outputPath = path.join(__dirname, '../index.html');

        console.log('Reading resume.md...');
        const rawFileContent = await fs.readFile(mdPath, 'utf-8');

        // Split by Language Marker
        const parts = rawFileContent.split('<!-- LANGUAGE_SPLIT: EN -->');
        const zhMarkdown = parts[0] || '';
        const enMarkdown = parts[1] || ''; // If no split found, dry run with empty

        // Helper to process a single language markdown into HTML variables
        function processLanguage(mdContent, langCode) {
            if (!mdContent.trim()) return null;

            // Convert MD to HTML
            const htmlBody = marked.parse(mdContent);

            // Structure: Header[0] --- Contact[1] --- Traits[2] --- Skills[3] --- Work[4] --- Education[5]
            const sections = htmlBody.split('<hr>');

            // Helper to strip H1/H2 tags
            const stripTitles = (html) => html ? html.replace(/<h[12].*?>.*?<\/h[12]>\s*/g, '') : '';

            // Extract Name/Title
            const titleMatch = mdContent.match(/^#\s+(.+)$/m);
            const fullTitle = titleMatch ? titleMatch[1].trim() : '劉胤檀 Anton Liu';

            // Special Name Processing for ZH (Anton's specific preference)
            let primaryName = fullTitle;
            let secondaryName = '';

            if (langCode === 'zh') {
                const nameParts = fullTitle.split(/\s+(.+)/);
                primaryName = nameParts[0];
                secondaryName = nameParts[1] || '';
                if (secondaryName.includes(') ')) {
                    secondaryName = secondaryName.replace(') ', ')&nbsp;&nbsp;&nbsp;');
                }
            } else {
                // English Name Processing (Simplistic for now, or customize if needed)
                // Keeping it full line for EN header usually looks better, or split same way
                // EN: "Anton (Ying-Tan) Liu"
                primaryName = fullTitle;
            }

            // Extract Summary (from Header section 0)
            const headerRaw = sections[0] || '';
            const summaryMatch = headerRaw.match(/<blockquote>([\s\S]*?)<\/blockquote>/);
            const summaryContent = summaryMatch ? summaryMatch[1] : '';

            // Extract Sections
            // 0: Header (Name/Summary) - Handled above
            // 1: Contact
            // 2: Traits (Key Attributes)
            // 3: Skills
            // 4: Work Experience
            // 5: Education

            // Note: Section indices depend heavily on the exact number of <hr> tags.
            // If EN version has same structure, indices match.

            const contactRaw = sections[1] || ''; // Extract phone/email/dob from list
            // Simple parsing for contact info to put in header
            // Looking for list items: <li>...</li>
            const contactItems = contactRaw.match(/<li>(.*?)<\/li>/g) || [];
            const contactHtml = contactItems.map(item => {
                // Add icons if missing (naive check)
                let text = item.replace(/<\/?li>/g, '').trim();
                // This part relies on specific markdown formatting. 
                // For robustness, we might just dump the contactRaw into the sidebar or header.
                // But the original design put it in header gap-x-6.
                // Let's regenerate semantic HTML for header contacts from the raw list items if possible
                // Or just pass the raw html if it fits.

                // Reuse existing icons based on text content keywords?
                let icon = '📌';
                if (text.includes('988') || text.includes('Phone') || text.includes('電話')) icon = '📱';
                if (text.includes('@') || text.includes('Email')) icon = '✉️';
                if (text.includes('1990') || text.includes('Birthday') || text.includes('生日') || text.includes('DOB')) icon = '📅';

                // Strip bolding ** key ** if present for cleaner icon pairing?
                // The original had explicit spans. Let's wrap raw text.
                return `<span class="flex items-center gap-1.5"><span class="text-slate-900">${icon}</span> ${text}</span>`;
            }).join('\n');


            return {
                primaryName,
                secondaryName,
                summaryContent,
                contactHtml,
                traitsContent: stripTitles(sections[2] || ''),
                skillsContent: stripTitles(sections[3] || ''),
                workContent: stripTitles(sections[4] || ''),
                educationContent: stripTitles(sections[5] || '')
            };
        }

        const zhData = processLanguage(zhMarkdown, 'zh');
        const enData = processLanguage(enMarkdown, 'en');

        // Static Labels Map
        const labels = {
            zh: {
                work: "Work Experience",
                traits_title: "", // No title in original
                skills: "Skills",
                education: "Education",
                print: "🖨️"
            },
            en: {
                work: "Work Experience",
                traits_title: "",
                skills: "Skills",
                education: "Education",
                print: "🖨️"
            }
        };

        // Render Function for a specific language block
        function renderBody(data, lang, isHidden) {
            if (!data) return '';

            return `
            <div id="content-${lang}" class="grid grid-cols-12 h-full flex-grow lang-section transition-opacity duration-300 ${isHidden ? 'hidden opacity-0' : 'opacity-100'}">
                
                <!-- LEFT COLUMN (Main Content): Col-8 -->
                <div class="col-span-8 flex flex-col">
                    
                    <!-- HEADER LEFT -->
                    <header class="p-12 pb-8 pr-8 border-b border-gray-100 relative z-10">
                        <h1 class="text-4xl font-black text-slate-800 tracking-tight mb-2 leading-tight">
                            ${data.primaryName} 
                            ${data.secondaryName ? `<br class="hidden print:block"><span class="text-xl font-light text-slate-400 align-middle">${data.secondaryName}</span>` : ''}
                        </h1>
                        <div class="text-base text-slate-600 leading-relaxed mb-6 mt-4 border-l-4 border-slate-800 pl-4 py-1 italic bg-slate-50 rounded-r">
                            ${data.summaryContent}
                        </div>
                        
                        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-500 mt-auto">
                            ${data.contactHtml}
                        </div>
                    </header>
    
                    <!-- BODY LEFT (Work) -->
                    <div class="p-12 pr-8 pt-8 flex-grow">
                        <section>
                            <div class="flex items-center gap-3 mb-8">
                                <div class="w-8 h-1 bg-slate-800"></div>
                                <h2 class="text-xl font-bold text-slate-800 tracking-widest uppercase" data-i18n="work">${labels[lang].work}</h2>
                            </div>
                            
                            <div class="timeline-line pl-8 markdown-content">
                                ${data.workContent}
                            </div>
                        </section>
                    </div>
                </div>
    
                <!-- RIGHT COLUMN (Sidebar): Col-4 -->
                <div class="col-span-4 bg-slate-50 border-l border-slate-100 flex flex-col">
                    
                    <!-- HEADER RIGHT (Traits) -->
                    <div class="p-12 pl-8 pt-12 pb-8 border-b border-gray-200/50 bg-slate-100/50">
                            <!-- Traits (Using raw content from MD, assuming it's a list) -->
                            <!-- Re-styling check: Original used manual map. 
                                 For i18n, we should parse the UL/LI from traitsContent and style it. -->
                            <div class="flex flex-col items-start gap-3 traits-list">
                                ${data.traitsContent.replace(/<li>/g, '<div class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span class="text-lg font-bold text-slate-600 tracking-widest">').replace(/<\/li>/g, '</span></div>').replace(/<ul>|<\/ul>/g, '')}
                            </div>
                    </div>
    
                    <!-- BODY RIGHT (Skills & Edu) -->
                    <div class="p-12 pl-8 pt-8 flex-grow">
                            <section class="mb-12">
                                <div class="flex items-center gap-3 mb-6">
                                <div class="w-6 h-1 bg-slate-400"></div>
                                <h2 class="text-lg font-bold text-slate-700 tracking-widest uppercase" data-i18n="skills">${labels[lang].skills}</h2>
                            </div>
                            <div class="markdown-content sidebar-content">
                                ${data.skillsContent}
                            </div>
                        </section>
    
                        <section>
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-6 h-1 bg-slate-400"></div>
                                <h2 class="text-lg font-bold text-slate-700 tracking-widest uppercase" data-i18n="education">${labels[lang].education}</h2>
                            </div>
                            <div class="markdown-content sidebar-content">
                                ${data.educationContent}
                            </div>
                        </section>
                    </div>
                </div>
            </div>`;
        }

        const template = `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${zhData.primaryName} - CV</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
    <style>
        /* Fade transition support */
        .lang-section { transition: opacity 0.3s ease-in-out; }
        .hidden { display: none; }
        .opacity-0 { opacity: 0; }
        .opacity-100 { opacity: 1; }
    </style>
</head>
<body class="py-10 px-4 print:py-0 print:px-0">
    <div class="cv-container max-w-5xl mx-auto bg-white shadow-xl relative overflow-hidden flex flex-col min-h-[1123px]">
        
        <!-- Language Content Blocks -->
        ${renderBody(zhData, 'zh', false)}
        ${enData ? renderBody(enData, 'en', true) : ''}

        <!-- Clean Footer -->
        <footer class="h-4 bg-gradient-to-r from-slate-800 to-slate-600 col-span-12 w-full absolute bottom-0 z-20"></footer>
    </div>

    <!-- UI Controls Container -->
    <div class="fixed bottom-8 right-8 no-print print:hidden flex flex-col gap-4">
        
        <!-- Language Switcher (Injected via JS, but placeholder here for structure) -->
        <div id="i18n-controls"></div>

        <button onclick="window.print()" class="bg-slate-800 hover:bg-slate-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95" title="Print / Save PDF">
            <span class="text-2xl">🖨️</span>
        </button>
    </div>

    <!-- Scripts -->
    <script src="./js/i18n.js"></script>
</body>
</html>
        `;

        await fs.writeFile(outputPath, template);
        console.log('Build successful: index.html updated with Dual Language Support.');

    } catch (err) {
        console.error('Build Error:', err);
    }
}

build();
