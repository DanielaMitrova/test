import React from 'react';
import { ComputedSection, Entry } from '../types';
import EntryComponent from './EntryComponent';

interface SectionComponentProps {
    section: ComputedSection;
    onDataUpdate: (updatedData: ComputedSection) => void;
    level: number;
}

const SectionComponent: React.FC<SectionComponentProps> = ({ 
    section, 
    onDataUpdate, 
    level 
}) => {
    const handleEntryUpdate = (updatedEntry: Entry, index: number) => {
        const updatedChildren = [...section.children];
        updatedChildren[index] = updatedEntry;
        
        const updatedSection: ComputedSection = {
            ...section,
            children: updatedChildren,
            computedSum: updatedChildren.reduce((sum, child) => {
                if ('computedSum' in child) {
                    return sum + child.computedSum;
                } else {
                    return sum + child.sum;
                }
            }, 0)
        };
        
        onDataUpdate(updatedSection);
    };

    const handleSectionUpdate = (updatedChildSection: ComputedSection, index: number) => {
        const updatedChildren = [...section.children];
        updatedChildren[index] = updatedChildSection;
        
        const updatedSection: ComputedSection = {
            ...section,
            children: updatedChildren,
            computedSum: updatedChildren.reduce((sum, child) => {
                if ('computedSum' in child) {
                    return sum + child.computedSum;
                } else {
                    return sum + child.sum;
                }
            }, 0)
        };
        
        onDataUpdate(updatedSection);
    };

    return (
        <div className="section" style={{ marginLeft: `${level * 20}px` }}>
            <div className="section-header">
                <span className="section-name">{section.name}</span>
                
                <span className="section-sum">${section.computedSum.toLocaleString()}</span>
            </div>
            
            <div className="section-children">
                {section.children.map((child, index) => (
                    <div key={index}>
                        {'children' in child ? (
                            <SectionComponent
                                section={child}
                                onDataUpdate={(updatedChild) => handleSectionUpdate(updatedChild, index)}
                                level={level + 1}
                            />
                        ) : (
                            <EntryComponent
                                entry={child}
                                onUpdate={(updatedEntry) => handleEntryUpdate(updatedEntry, index)}
                                level={level + 1}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionComponent; 
