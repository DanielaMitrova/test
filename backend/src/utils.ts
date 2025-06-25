import { Section, ComputedSection } from './types';

export function computeSectionSum(section: Section): ComputedSection {
    const computedChildren = section.children.map(child => {
        if ('children' in child) {
            return computeSectionSum(child);
        } else {
            return child;
        }
    });

    const computedSum = computedChildren.reduce((total, child) => {
        if ('computedSum' in child) {
            return total + child.computedSum;
        } else {
            return total + child.sum;
        }
    }, 0);

    return {
        name: section.name,
        children: computedChildren,
        computedSum
    };
}

export function computeTotalSum(data: Section): number {
    const computedData = computeSectionSum(data);
    return computedData.computedSum;
}