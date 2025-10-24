import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function page() {
  return (
    <div className="w-full  p-4 ">
      <form className="w-full max-w-md mx-auto p-4">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Fill the Form</FieldLegend>
            <FieldDescription>
              Submit Chords, Lyrics, Translation, Category, Correction, suggestion.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="Title">
                  Song Title
                </FieldLabel>
                <Input
                  id="Title"
                  placeholder="Song Title"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="Subject">
                  Subject
                </FieldLabel>
                <Input
                  id="Subject"
                  placeholder="Lyrics, Translation, Category, Correction, suggestion"
                  required
                />
                <FieldDescription>
                 Please fill the appropriate subject.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="Link">
                  Link
                </FieldLabel>
                <Input
                  id="Link"
                  placeholder="Youtube, spotify, website Link"
                  required
                />
                <FieldDescription>
                 Please provide Youtube, spotify, website Link
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-norm al"
                >
                  Orignal Song
                </FieldLabel>
              </Field>
            </FieldGroup>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="comments"
                  placeholder="Add comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>

        </FieldGroup>
      </form>
    </div>
  )
}
