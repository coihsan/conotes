import { Node, mergeAttributes } from '@tiptap/react';

const LinkedNote = Node.create({
  name: 'linkedNote',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      noteId: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'a[data-note-id]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(HTMLAttributes, { 'data-note-id': HTMLAttributes.noteId }), 0];
  },
  // addCommands() {
  //   return {
  //     setLinkedNote: (noteId: string) => (commands: any ) => {
  //       return commands.insertContent({
  //         type: this.name,
  //         content: { noteId },
  //       });
  //     },
  //   };
  // },
});

export default LinkedNote;
