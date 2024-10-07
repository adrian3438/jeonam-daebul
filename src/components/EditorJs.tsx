'use client'
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";
import Undo from 'editorjs-undo';
import Checklist from '@editorjs/checklist'
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table';
import Embed from '@editorjs/embed';
import DragDrop from 'editorjs-drag-drop';
import Head from "next/head";
import LinkTool from '@editorjs/link';
import Paragraph from '@editorjs/paragraph';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import IndentTune from 'editorjs-indent-tune';
import InlineCode from '@editorjs/inline-code';
import Strikethrough from '@sotaproject/strikethrough';
import Underline from '@editorjs/underline';
import Annotation from 'editorjs-annotation';
import Tooltip from 'editorjs-tooltip';
import ColorPlugin from '@itech-indrustries/editor-js-text-color';
import Marker from '@editorjs/marker';
import axios from "axios";
import ToggleBlock from 'editorjs-toggle-block';
import Title from "title-editorjs";
import List from "@editorjs/list";
import FontSizeTool from 'editorjs-inline-font-size-tool';
import FontFamily from 'editorjs-inline-font-family-tool';
import { useAuth } from "./Context/AuthContext";
// const FontSizeTool = require('editorjs-inline-font-size-tool');
// const FontFamily = require('editorjs-inline-font-family-tool');
// const ColorPlugin = require('editorjs-text-color-plugin');
interface Props {
    isEdit?:boolean
    initData?:any
    setData?:any
}
export default function Editorjs ({isEdit , initData , setData} : Props) {
    const editorRef = useRef<any>(null)
    useEffect(()=>{
        // if(!initData) return;
        if(!editorRef.current) return;
        const editor = new EditorJS({
            readOnly : false,
            holder: editorRef.current,
            inlineToolbar : true,
            data : initData,
            tools : {
                paragraph: { class: Paragraph, inlineToolbar : true, tunes: ['anyTuneName', 'indentTune'], },
                title: Title,
                // header : { class : Header, inlineToolbar : true, tunes: ['anyTuneName'],
                //     config : {
                //         levels: [1, 2, 3, 4, 5],
                //         defaultLevel : 1,
                //     }
                // },
                fontFamily : FontFamily,
                fontSize : FontSizeTool,
                underline: Underline,
                Strikethrough : Strikethrough,
                annotation: {
                    class : Annotation,
                },
                toggle: {
                    class: ToggleBlock,
                    inlineToolbar: true,
                },
                tooltip: {
                    class: Tooltip,
                    inlineToolbar : true,
                    config: {
                      location: 'left',
                      underline: true,
                      placeholder: 'Enter a tooltip',
                      highlightColor: '#FFEFD5',
                      backgroundColor: '#154360',
                      textColor: '#FDFEFE',
                      holder: 'editorId',
                    }
                },
                Color : {
                    class : ColorPlugin,
                },
                Marker : {
                    class : Marker,
                },
                list : {
                    class : List, inlineToolbar : true, 
                    config : {defaultStyle : 'unordered'}
                },
                Checklist : { class : Checklist, inlineToolbar : true },
                imageTool : {
                    class : ImageTool,
                    config : {
                        captionPlaceholder : '',
                        uploader: {
                            uploadByUrl: (url: any) => {
                                return new Promise((resolve, reject) => {
                                    resolve({
                                        success: 1,
                                        file: {
                                            url : url
                                        }
                                    });
                                })
                            },
                            uploadByFile: (file : any) => {
                                return new Promise((resolve, reject) => {
                                    const formData = new FormData()
                                    const timeStamp = new Date().getTime()
                                        formData.append('file', file, `${timeStamp}_${file.name}`)
                                    fetch('https://marineplaza.org/dim-api/controller/admin/setToastFileUpload.php', {
                                    // fetch('/api/editor/setUpload', {
                                        method : 'post', body : formData
                                    })
                                    .then(res => res.json())
                                    .then(data => {
                                        resolve({
                                            success: 1,
                                            file: {
                                                url: data?.imageUrl
                                            }
                                        });
                                    })
                                });
                            },
                        }
                    },
                },
                table : { class : Table, inlineToolbar : true,
                    config : {
                        rows : 2, cols : 2
                    }
                },
                embed : { class : Embed, config : {services : {youtube : true}} },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/api/getLink',
                    }
                },
                // 텍스트 정렬
                anyTuneName: { class:AlignmentTuneTool,
                    config:{
                        default: "left",
                        blocks: {
                        header: 'center',
                        list: 'right'
                        }
                    },
                },
                // 들여쓰기
                indentTune : { class : IndentTune as any },
                inlineCode: { class: InlineCode, inlineToolbar : true, shortcut: 'CMD+SHIFT+M', },
                // StyleInlineTool : {
                //     class: StyleInlineTool as any,
                //     inlineToolbar: true,
                // },
            },
            onReady : () => {
                new Undo({editor});
                new DragDrop(editor); 
            },
            onChange : async () => {
                const savedData = await editor.save()
                // setText(savedData)
                setData((prev : any) => ({...prev, note : savedData}))
            },

        });

        return () => {
            editor.isReady
            .then(() => {
                editor.destroy()
            })
        }
    }, [initData])
    return(
        <>
        
        <div className="editor-container" id="editor" ref={editorRef}></div>
        {/* <button onClick={()=>handleSave()}>Save</button> */}
        {/* <pre>{JSON.stringify(text, null, 2)}</pre> */}
        </>
    )
}