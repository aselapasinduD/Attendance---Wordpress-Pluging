/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useEffect, useState } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const [currentTime, setCurrentTime] = useState(new Date());
    const {title} = attributes;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const updateTitle = (event) => setAttributes({ title: event.target.innerText});
    const handleTitleUpdate = (titleValue) => setAttributes({title: titleValue});

    
	return (
		<div { ...useBlockProps() }>
            <InspectorControls>
                <PanelBody title={__('Settings', 'attendance-addon-from-innenta-solutions')}>
                    <TextControl label={__('Title', 'attendance-addon-from-innenta-solutions')} value={title} onChange={handleTitleUpdate} />
                </PanelBody>
            </InspectorControls>
            <div>
                <h1 className='title' contentEditable suppressContentEditableWarning onBlur={updateTitle}>{title !== " "? title : 'Attendance Mark'}</h1>
            </div>
			<span className="attendance-current-time">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
            <div className='attendance-shift-btn-container'>
                <button type='button' id='attendance-shift-start-btn' className='attendance-shift-start-btn'>Shift Start</button>
                <button type='button' id='attendance-shift-end-btn' className='attendance-shift-end-btn'>Shift End</button>
            </div>
		</div>
	);
}
