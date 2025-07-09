import FontStyle from "@/components/ui/FontStyle";
import React from "react";
import styled from "styled-components";

interface ContentTextProps {
  text: string;
  normalStyle?: React.CSSProperties;
  boldStyle?: React.CSSProperties;
  textAlign?: "left" | "center" | "right";
}

const ContentTextContainer = styled.p<{
  textAlign: "left" | "center" | "right";
}>`
  line-height: 1.8;
  margin: 0;
  text-align: ${(props) => props.textAlign};
`;

const NormalSpan = styled.span`
  ${FontStyle.body1Regular}
  font-size: clamp(12px, 2vw, 16px);
  letter-spacing: 0.3px;
  display: inline;
`;

const BoldSpan = styled.span`
  ${FontStyle.display1ExtraBold}
  font-size: clamp(12px, 2vw, 16px);
  letter-spacing: 0.3px;
  display: inline;
`;

const ContentText: React.FC<ContentTextProps> = ({
  text,
  normalStyle,
  boldStyle,
  textAlign = "left",
}) => {
  const regex = /-(.*?)-/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Append text before the bold part.
    if (match.index > lastIndex) {
      parts.push(
        <NormalSpan key={lastIndex} style={normalStyle}>
          {text.substring(lastIndex, match.index)}
        </NormalSpan>
      );
    }
    // Append bold part.
    parts.push(
      <BoldSpan key={match.index} style={boldStyle}>
        {match[1]}
      </BoldSpan>
    );
    lastIndex = regex.lastIndex;
  }
  // Append any remaining text.
  if (lastIndex < text.length) {
    parts.push(
      <NormalSpan key={lastIndex} style={normalStyle}>
        {text.substring(lastIndex)}
      </NormalSpan>
    );
  }

  return (
    <ContentTextContainer textAlign={textAlign}>{parts}</ContentTextContainer>
  );
};

export default ContentText;
