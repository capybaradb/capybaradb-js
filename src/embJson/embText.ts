import { SupportedEmbModels } from "../types/supportedModels";

export class EmbText {
  private text: string;
  private embModel: SupportedEmbModels;
  private maxChunkSize: number;
  private chunkOverlap: number;
  private isSeparatorRegex: boolean;
  private separators: string[] | null;
  private keepSeparator: boolean;

  constructor(
    text: string,
    embModel: SupportedEmbModels = "text-embedding-3-small",
    maxChunkSize: number = 200,
    chunkOverlap: number = 20,
    isSeparatorRegex: boolean = false,
    separators: string[] | null = null,
    keepSeparator: boolean = false
  ) {
    if (!EmbText.isValidText(text)) {
      throw new Error("Invalid text: must be a non-empty string.");
    }
    if (!EmbText.isValidEmbModel(embModel)) {
      throw new Error(`Invalid embedding model: ${embModel} is not supported.`);
    }

    this.text = text;
    this.embModel = embModel;
    this.maxChunkSize = maxChunkSize;
    this.chunkOverlap = chunkOverlap;
    this.isSeparatorRegex = isSeparatorRegex;
    this.separators = separators;
    this.keepSeparator = keepSeparator;
  }

  /**
   * Validate that 'text' is a non-empty string
   */
  private static isValidText(text: string): boolean {
    return typeof text === "string" && text.trim().length > 0;
  }

  /**
   * Validate that 'embModel' is in the supported list
   */
  private static isValidEmbModel(embModel: string): boolean {
    const supportedModels: SupportedEmbModels[] = [
      "text-embedding-3-small",
      "text-embedding-3-large",
      "ada v2",
    ];
    return supportedModels.includes(embModel as SupportedEmbModels);
  }

  /**
   * Return a JSON representation of this object
   */
  public toJSON(): Record<string, any> {
    return {
      "@embText": {
        text: this.text,
        emb_model: this.embModel,
        max_chunk_size: this.maxChunkSize,
        chunk_overlap: this.chunkOverlap,
        is_separator_regex: this.isSeparatorRegex,
        separators: this.separators,
        keep_separator: this.keepSeparator,
      },
    };
  }

  /**
   * Restore an EmbText object from its JSON representation.
   * Defaults are applied if any properties are missing.
   */
  public static fromJSON(data: Record<string, any>): EmbText {
    const {
      text,
      emb_model,
      max_chunk_size = 200,
      chunk_overlap = 20,
      is_separator_regex = false,
      separators = null,
      keep_separator = false,
    } = data["@embText"] ?? {};

    return new EmbText(
      text,
      emb_model,
      max_chunk_size,
      chunk_overlap,
      is_separator_regex,
      separators,
      keep_separator
    );
  }
}