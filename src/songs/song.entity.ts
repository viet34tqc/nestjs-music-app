import { ArtistEntity } from 'src/artists/artist.entity';
import { PlaylistEntity } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  // (artist) => artist.songs is inverse side
  // This is crucial for TypeORM to understand how the two entities
  // Here, it indicates that each artist instance has multiple user
  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, { cascade: true }) // cascade can be boolean | insert | update
  @JoinTable({ name: 'songs_artists' }) // This is mandatory in many to many relationship of TypeOrm
  artists: ArtistEntity[];

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs)
  playlist: PlaylistEntity[];
}
