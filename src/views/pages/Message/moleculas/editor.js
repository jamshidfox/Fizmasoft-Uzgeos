import { useState } from "react"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap"
import "@styles/react/libs/editor/editor.scss"

const EditorControlled = (props) => {
  const [value, setValue] = useState(EditorState.createEmpty())
  const handleChange = (data2) => {
    props.setEditorText(data2.blocks[0])
  }
  return (
    <Row>
      <Col sm={12}>
        <Card>
          <CardHeader></CardHeader>
          <CardBody>
            <Editor onChange={handleChange} editorState={value} onEditorStateChange={(data) => setValue(data)} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default EditorControlled
