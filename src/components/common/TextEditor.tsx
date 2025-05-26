'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import History from '@tiptap/extension-history'

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react'

import { useEffect } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
  error?: string
}

export default function TextEditor({ value, onChange, error }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      History,
      Underline,
      Placeholder.configure({
        placeholder: 'Type a content...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CharacterCount.configure(),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `min-h-[180px] px-4 py-3 text-sm rounded-md bg-gray-50 border focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`,
      },
    },
  })

  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm space-y-0">
      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-200">
        <ToolbarButton
          icon={<Undo2 size={16} />}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          icon={<Redo2 size={16} />}
          onClick={() => editor.chain().focus().redo().run()}
        />
        <Divider />
        <ToolbarButton
          icon={<Bold size={16} />}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={<Italic size={16} />}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={<UnderlineIcon size={16} />}
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Divider />
        <ToolbarButton
          icon={<AlignLeft size={16} />}
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolbarButton
          icon={<AlignCenter size={16} />}
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolbarButton
          icon={<AlignRight size={16} />}
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
        <ToolbarButton
          icon={<AlignJustify size={16} />}
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        />
      </div>

      <div className="p-4 pt-2">
        <EditorContent editor={editor} />
      </div>

      <div className="border-t text-sm px-4 py-2 text-gray-500 flex justify-between">
        <span>{editor.storage.characterCount.words()} Words</span>
      </div>

      {error && <p className="text-sm text-red-600 px-4 pb-2">{error}</p>}
    </div>
  )
}

function ToolbarButton({
  icon,
  onClick,
  active,
}: {
  icon: React.ReactNode
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded-md transition border text-gray-700 ${
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white hover:bg-gray-100 border-gray-300'
      }`}
    >
      {icon}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-300 mx-1" />
}
