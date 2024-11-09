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
        tag: 'span[data-note-id]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-note-id': HTMLAttributes.noteId }), 0];
  },
  // addCommands() {
  //   return {
  //     setLinkedNote: (noteId: any) => (commands: any ) => {
  //       return commands.insertContent({
  //         type: this.name,
  //         content: { noteId },
  //       });
  //     },
  //   };
  // },
});

export default LinkedNote;
