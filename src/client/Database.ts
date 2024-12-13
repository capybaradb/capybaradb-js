import { Collection } from "./Collection";

export class Database {
  private apiKey: string;
  private projectId: string;
  private dbName: string;

  constructor(apiKey: string, projectId: string, dbName: string) {
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.dbName = dbName;
  }

  /**
   * Get a collection instance within this database.
   * @param collectionName - The name of the collection
   */
  public collection(collectionName: string): Collection {
    return new Collection(
      this.apiKey,
      this.projectId,
      this.dbName,
      collectionName
    );
  }
}