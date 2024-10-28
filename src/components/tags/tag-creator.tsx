import { TagItem } from "@/lib/types"
import { getContrastColor } from "@/lib/utils/helpers"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dismiss24Regular } from "@fluentui/react-icons"
import { v4 } from "uuid"

const TagCreator = () => {
    const [tags, setTags] = useState<TagItem[]>([])
    const [newTagName, setNewTagName] = useState("")
    const [newTagColor, setNewTagColor] = useState("#000000")

    const addTag = () => {
        if (newTagName.trim() !== "") {
          setTags([...tags, { id: v4(), name: newTagName.trim(), color: newTagColor }])
          setNewTagName("")
          setNewTagColor("#000000")
        }
      }
    
      const removeTag = (id: string) => {
        setTags(tags.filter((tag) => tag.id !== id))
      }

    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Tag Manager</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tagName">Tag Name</Label>
          <Input
            id="tagName"
            type="text"
            placeholder="Enter tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagColor">Tag Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="tagColor"
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              className="w-12 h-12 p-1 rounded"
            />
            <span className="text-sm text-muted-foreground">{newTagColor}</span>
          </div>
        </div>
        <Button onClick={addTag} className="w-full">
          Add Tag
        </Button>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Added Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center space-x-1 rounded-full px-3 py-1 text-sm"
              style={{ backgroundColor: tag.color, color: getContrastColor(tag.color) }}
            >
              <span>{tag.name}</span>
              <button
                onClick={() => removeTag(tag.id)}
                className="ml-1 rounded-full p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <Dismiss24Regular className="size-4"/>
                <span className="sr-only">Remove {tag.name} tag</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}
export default TagCreator