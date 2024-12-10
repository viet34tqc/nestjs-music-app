import { PlaylistEntity } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // (playlist) => playlist.user is inverse side
  // This is crucial for TypeORM to understand how the two entities
  // Here, it indicates that each playlist instance has a property called user
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];
}
