export function applyDesignDNA(dna, layoutMode) {
    // Default values when no plan exists
    if (!dna) {
        return 'bg-gray-50 text-gray-800 font-sans p-4 pt-20';
    }

    const classes = [];
    const isDarkBase = layoutMode === 'creative' || layoutMode === 'dashboard';

    // 1. Map palette to Tailwind theme classes
    if (dna.palette === 'dark') {
        classes.push('bg-gray-900 text-white');
    } else if (dna.palette === 'blue') {
        classes.push('bg-blue-900 text-blue-50');
    } else {
        // neutral
        classes.push('bg-gray-50 text-gray-900');
    }

    // 2. Map tone to font weight & letter spacing
    if (dna.tone === 'minimal') {
        classes.push('font-light tracking-wider');
    } else if (dna.tone === 'bold') {
        classes.push('font-black tracking-tighter');
    } else {
        // corporate
        classes.push('font-medium tracking-normal');
    }

    // 3. Map density to padding classes
    if (dna.density === 'compact') {
        classes.push('p-4 md:p-8');
    } else {
        // spacious
        classes.push('p-12 md:p-24');
    }

    // 4. Map radius to rounded classes
    if (dna.radius === 'sm') {
        classes.push('rounded-sm');
    } else if (dna.radius === 'lg') {
        classes.push('rounded-3xl');
    } else {
        classes.push('rounded-xl');
    }

    // 5. Aesthetic Theme Sub-Layer (CSS Primitive Overrides)
    if (dna.theme) {
        if (dna.theme === 'theme-light') {
            if (isDarkBase) classes.push('theme-invert');
        } else if (dna.theme === 'theme-dark') {
            if (!isDarkBase) classes.push('theme-invert');
        } else {
            classes.push(dna.theme);
        }
    }

    return classes.join(' ');
}
